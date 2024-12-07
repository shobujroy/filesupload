import axios from "axios";
import api from "../api/index";
import swal from "sweetalert2";

export default {
  formatDate(date) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${month}-${day}-${year}`;
  },

  textTruncate(str, length = 100, ending = "...") {
    if (str?.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  },

  async fileUploadonS3(file) {
    try {
      const fileData = {
        key: "",
        url: "",
      };

      if (file) {
        // this.progress = 1

        // file size is smaller than 5 Mb
        if (file?.size < 4999999) {
          // this.progress = 20
          console.log("file size is smaller than 5 mb");
          const formData = new FormData();
          formData.append("name", file?.name);

          const fileName = file?.name.replace(/ /g, "_");

          // upload to get signed URL
          // const responseOne = await axios.get(
          //   `https://devapi.previsitreview.com/api/img/getPutSignedUrl?type=get&name=${fileName}`
          // )
          let params = { type: "get", key: fileName };
          const responseOne = await api().patientService.getPutSignedUrl(
            params
          );

          // this.progress = 50
          const signedUrl = responseOne?.data?.url;
          // const fileExtension = file?.name.slice(((file?.name.lastIndexOf('.') - 1) >>> 0) + 2)
          const fileExtension = file.type;

          // const key = responseOne?.data?.data?.key + '.' + fileExtension
          const key = responseOne?.data?.key;
          const url = responseOne?.data?.url;
          console.log("responseOne : ", responseOne.data);
          fileKey = responseOne?.data?.key;
          fileUrl = responseOne?.data?.url;
          // upload to API
          await axios
            .put(signedUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
            })
            .then((response) => {
              if (response.status == 200) {
                // this.progress = 100
              }
            })
            .catch((error) => {
              console.log("Upload error:", error);
            });
        }

        // file is bigger than 5 mb
        if (file?.size > 4999999) {
          console.log("file is bigger than 5 mb");

          const chunkSize = 5 * 1024 * 1024;
          const chunks = [];
          let uploadedChunks = 0;
          const uploadedEtags = [];

          const formData = new FormData();
          formData.append("name", file?.name);

          const body = { name: file?.name };

          // upload to S3
          const responseOne = await api().patientService.initiateUpload(body);
          const responseOneData =
            responseOne?.response?.createMultipartUploadResponse;
          const totalChunks = Math.ceil(file.size / chunkSize);

          console.log(responseOne);

          const formDataTwo = new FormData();
          // formDataTwo.append('name', file?.name)
          formDataTwo.append("content_type", file?.type);
          formDataTwo.append("uploadId", responseOneData?.UploadId);
          formDataTwo.append("totalParts", totalChunks);
          formDataTwo.append("key", responseOneData?.Key);
          fileKey = responseOneData?.Key;
          const bodyTwo = {
            key: responseOneData?.Key,
            uploadId: responseOneData?.UploadId,
            totalParts: totalChunks,
          };
          // upload to multi-signed part S3
          const responseTwo = await api().patientService.getSignedUrlMultipart(
            bodyTwo
          );
          const responseTwoSignedUrls = responseTwo?.data?.signedUrls;

          const uploadViaSignedUrlMultipart = async (
            preSignedUrl,
            key,
            doc,
            partNumber
          ) => {
            const fileKey = key;
            let uploadResponse = await axios.put(preSignedUrl, doc, {
              headers: {
                "Content-Type": file.type, // Set the content type to binary data
              },
            });
            uploadedChunks++;
            // this.progress = Math.floor((uploadedChunks / totalChunks) * 100)

            uploadedEtags.push({
              PartNumber: partNumber,
              ETag: uploadResponse.headers.etag.replace(/"/g, ""),
            });
            const sortedParts = uploadedEtags.sort(
              (a, b) => a.PartNumber - b.PartNumber
            );
            console.log(sortedParts);
            // console.log(this.progress)
            if (uploadedChunks === totalChunks) {
              let completeUploadpPostData = {
                key: responseOneData?.Key,
                uploadId: responseOneData?.UploadId,
                ETagsArray: sortedParts,
              };
              console.log(completeUploadpPostData);
              let completeUploadResponse =
                await api().patientService.completeMultipartUpload(
                  completeUploadpPostData
                );

              console.log(completeUploadResponse);
              if (completeUploadResponse?.status === 200) {
                const body = {
                  content_type: file?.type,
                  name: file?.name,
                  size: file?.size,
                  key: responseOneData?.Key,
                  url: completeUploadResponse?.data?.data?.Location,
                };
                // setTemplateKey(responseOneData?.Key)
                // setTemplateSize(file?.size)
                // setTemplateType(file?.type)
                // setTemplateUrl(completeUploadResponse?.data?.data?.Location)
                fileUrl = completeUploadResponse?.data?.Location;
              }
            }
          };

          for (let i = 1; i <= totalChunks; i++) {
            const start = (i - 1) * chunkSize;
            const end = Math.min(i * chunkSize, file?.size);
            const chunk = file.slice(start, end);
            chunks.push(chunk);
            uploadViaSignedUrlMultipart(
              responseTwoSignedUrls[i - 1],
              responseOneData?.Key,
              chunk,
              i
            );
          }
        }

        return fileData;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      new swal({
        toast: true,
        timerProgressBar: true,
        position: "top-end",
        icon: "error",
        text: `${error?.message || "Failed to upload the file!"}`,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  },

  async handleDownloadClick(key, returnData = false) {
    const link = await api().patientService.getSignedUrlDownload(key);
    if (returnData) return link?.data;
    window.open(link?.data, "_blank");
  },

  tConvert(time) {
    // Check correct time format and split into components
    time = time
      ?.toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  },

  formatTimeAgo(timestamp) {
    const currentTime = new Date();
    const messageTime = new Date(timestamp);
    const timeDifference = currentTime - messageTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (hours < 24) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  },

  rearrangeString(inputString) {
    if (!inputString) return;

    // Split the string into an array of words
    const wordsArray = inputString.split(" ");

    // Check if there are remaining words
    if (wordsArray.length > 1) {
      // Extract the first word and the remaining words
      const firstWord = wordsArray[0];
      const remainingWords = wordsArray.slice(1).join(" ");

      // Return the rearranged string with comma
      return `${remainingWords}, ${firstWord}`;
    } else {
      // If there are no remaining words, return the original string
      return inputString;
    }
  },

  loadSignFromSessionStorage() {
    const cachedImageData = sessionStorage.getItem("cachedSignImage");
    if (cachedImageData) {
      return cachedImageData;
    }
  },

  async storeImageInSessionStorage(imageURL) {
    const imageData = await this.fetchImageData(imageURL);
    if (imageData) {
      const dataToSave = this.convertToBase64(imageData); // Use Base64 if desired
      sessionStorage.setItem("cachedSignImage", dataToSave);
    }
  },

  formatSecondsToMinutes(seconds) {
    if (!Number.isInteger(seconds) || seconds < 0) {
      return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  },

  calculateAgeInMonths(dateOfBirth) {
    if (dateOfBirth) {
      var today = new Date();
      var birthDate = new Date(dateOfBirth);

      var yearsDiff = today.getUTCFullYear() - birthDate.getUTCFullYear();
      var monthsDiff = today.getUTCMonth() - birthDate.getUTCMonth();
      var daysDiff = today.getUTCDate() - birthDate.getUTCDate();

      if (daysDiff < 0) {
        monthsDiff -= 1;
        var lastMonth = new Date(
          Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1)
        );
        daysDiff += (lastMonth - birthDate) / (1000 * 60 * 60 * 24);
      }

      var ageInMonths = yearsDiff * 12 + monthsDiff;
      return ageInMonths;
    }
  },
};
