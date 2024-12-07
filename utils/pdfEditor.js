// utils/pdfEditor.js
import { PDFDocument } from "pdf-lib";

export async function modifyPdf(existingPdfBytes, formData) {
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();

  //   const nameField = form.getTextField("NameField");
  //   const emailField = form.getTextField("EmailField");

  //   nameField.setText(formData.name);
  //   emailField.setText(formData.email);

  return await pdfDoc.save();
}
