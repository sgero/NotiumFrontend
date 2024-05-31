import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf';
import {EntradaOcioCliente} from "../models/EntradaOcioCliente";
import 'jspdf-autotable';
import {toCanvas} from "qrcode";
import {ListaOcioCliente} from "../models/ListaOcioCliente";
import {ComprarReservadoDTO} from "../models/ComprarReservadoDTO";

@Injectable({
  providedIn: 'root',
})

export class PdfService {

  constructor() {
  }

  public async downloadPdf(general: EntradaOcioCliente[], reservado: ComprarReservadoDTO, lista: ListaOcioCliente[]): Promise<void> {
    const doc = new jsPDF();
    let yOffset = 10;

    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    const addText = (text: string, x: number, y: number, maxWidth: number) => {
      const splitText = doc.splitTextToSize(text, maxWidth);
      doc.text(splitText, x, y);
      return y + splitText.length * 10;
    };

    const addTextCenter = (text: string, y: number, maxWidth: number) => {
      let lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: any) => {
        const textWidth = doc.getTextWidth(line);
        const x = (pageWidth - textWidth) / 2;
        doc.text(line, x, y);
        y += 10;
      });
      return y;
    };


    const addQRCode = async (data: string, x: number, y: number) => {
      try {
        const qrCanvas = document.createElement('canvas');
        await toCanvas(qrCanvas, data, {width: 100, margin: 2});
        const imgData = qrCanvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', x, y, 40, 40);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    const addCenteredImage = (imgSrc: string, y: number, width: number, height: number) => {
      const x = (pageWidth - width) / 2;
      doc.addImage(imgSrc, 'PNG', x, y, width, height);
      return y + height + 10;
    };

    async function extracted(d: ListaOcioCliente) {
      if (yOffset > pageHeight - 120) {
        doc.addPage();
        yOffset = 10;
      }
      yOffset = addText(`Código para acceder al establecimiento:`, 10, yOffset, doc.internal.pageSize.width - 20);
      await addQRCode(`${d.codigo}` + `${d.id}`, 10, yOffset);
      yOffset += 40;
      if (yOffset > pageHeight - 120) {
        doc.addPage();
        yOffset = 10;
      }
    }

    if (general.length > 0) {
      let data = general;
      doc.setFontSize(28);
      yOffset = addTextCenter(`${data[0].entradaOcioDTO!.eventoDTO!.nombre}`, yOffset, doc.internal.pageSize.width - 50);
      yOffset += 10;
      addCenteredImage(`${data[0].entradaOcioDTO!.eventoDTO!.cartel}`, 30, yOffset, 50);
      yOffset += 70;
      doc.setFontSize(20);
      yOffset = addTextCenter(`${data[0].entradaOcioDTO!.eventoDTO!.descripcion}`, yOffset, doc.internal.pageSize.width - 20);
      doc.setFontSize(16);
      yOffset = addText(`Código Vestimenta: ${data[0].entradaOcioDTO!.eventoDTO!.codigoVestimentaOcio}`, 10, yOffset, doc.internal.pageSize.width - 20);
      yOffset = addText(`Temática: ${data[0].entradaOcioDTO!.eventoDTO!.tematica}`, 10, yOffset, doc.internal.pageSize.width - 20);
      yOffset = addText('Datos de Compra', 10, yOffset, doc.internal.pageSize.width - 20);

      if (data[0].promocionDTO) {
        yOffset = addText(`Promoción Aplicada: ${data[0].promocionDTO.tipoPromocion}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Detalle de la promoción: ${data[0].promocionDTO.titulo}`, 10, yOffset, doc.internal.pageSize.width - 20);
      }

      doc.setFontSize(12);
      for (const d of data) {
        if (yOffset > pageHeight - 20) {
          doc.addPage();
          yOffset = 10;
        }
        yOffset += 10;

        yOffset = addText(`Datos Asistente:`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Fecha de Compra: ${d.fechaCompra?.substring(0, 10)}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Nombre Completo: ${d.datosCompradorDTO?.nombre} ${d.datosCompradorDTO?.apellidos}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Email: ${d.datosCompradorDTO?.email}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Teléfono: ${d.datosCompradorDTO?.telefono}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Fecha de Nacimiento: ${d.datosCompradorDTO?.fechaNacimiento?.substring(0, 10)}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Precio: ${d.entradaOcioDTO?.precio}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Tipo de Entrada: Entrada General`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Descripción: ${d.entradaOcioDTO?.detalleEntrada}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Consumiciones: ${d.entradaOcioDTO?.consumiciones}`, 10, yOffset, doc.internal.pageSize.width - 20);
        await extracted(d);

      }

      doc.save('entrada-general.pdf');
    } else if (reservado.datosCompradorDTOS.length > 0){
      let data = reservado;
      doc.setFontSize(28);
      yOffset = addTextCenter(`${data.reservadoOcioClienteDTO.reservadoOcioDTO?.eventoDTO!.nombre}`, yOffset, doc.internal.pageSize.width - 50);
      yOffset += 10;
      addCenteredImage(`${data.reservadoOcioClienteDTO.reservadoOcioDTO?.eventoDTO!.cartel}`, 30, yOffset, 50);
      yOffset += 50;
      doc.setFontSize(20);
      yOffset = addTextCenter(`${data.reservadoOcioClienteDTO.reservadoOcioDTO?.eventoDTO!.descripcion}`, yOffset, doc.internal.pageSize.width - 20);
      doc.setFontSize(16);
      yOffset = addText(`Código Vestimenta: ${data.reservadoOcioClienteDTO.reservadoOcioDTO?.eventoDTO!.codigoVestimentaOcio}`, 10, yOffset, doc.internal.pageSize.width - 20);
      yOffset = addText(`Temática: ${data.reservadoOcioClienteDTO.reservadoOcioDTO?.eventoDTO!.tematica}`, 10, yOffset, doc.internal.pageSize.width - 20);
      yOffset = addText('Datos de Compra', 10, yOffset, doc.internal.pageSize.width - 20);

      if (data.reservadoOcioClienteDTO.promocionDTO) {
        yOffset = addText(`Promoción Aplicada: ${data.reservadoOcioClienteDTO.promocionDTO.tipoPromocion}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Detalle de la promoción: ${data.reservadoOcioClienteDTO.promocionDTO.titulo}`, 10, yOffset, doc.internal.pageSize.width - 20);
      }

      doc.setFontSize(12);
      for (const d of data.datosCompradorDTOS) {
        if (yOffset > pageHeight - 20) {
          doc.addPage();
          yOffset = 10;
        }
        yOffset += 10;

        yOffset = addText(`Datos Asistente:`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Fecha de Compra: ${d.reservadoOcioClienteDTO?.fecha_compra?.substring(0, 10)}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Nombre Completo: ${d.nombre} ${d.apellidos}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Email: ${d.email}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Teléfono: ${d.telefono}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Fecha de Nacimiento: ${d.fechaNacimiento?.substring(0, 10)}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Precio: ${d.reservadoOcioClienteDTO?.reservadoOcioDTO?.precio}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Tipo de Entrada: Reservado`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Descripción: ${d.reservadoOcioClienteDTO?.reservadoOcioDTO?.detalleReservado}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Botellas: ${d.reservadoOcioClienteDTO?.reservadoOcioDTO?.botellas}`, 10, yOffset, doc.internal.pageSize.width - 20);
        await extracted(d);
      }

      doc.save('reservado.pdf');

    } else if (lista.length > 0){
      let data = lista;
      doc.setFontSize(28);
      yOffset = addTextCenter(`${data[0].listaOcioDTO!.eventoDTO!.nombre}`, yOffset, doc.internal.pageSize.width - 50);
      yOffset += 10;
      addCenteredImage(`${data[0].listaOcioDTO!.eventoDTO!.cartel}`, 30, yOffset, 50);
      yOffset += 50;
      doc.setFontSize(20);
      yOffset = addTextCenter(`${data[0].listaOcioDTO!.eventoDTO!.descripcion}`, yOffset, doc.internal.pageSize.width - 20);
      doc.setFontSize(16);
      yOffset = addText(`Código Vestimenta: ${data[0].listaOcioDTO!.eventoDTO!.codigoVestimentaOcio}`, 10, yOffset, doc.internal.pageSize.width - 20);
      yOffset = addText(`Temática: ${data[0].listaOcioDTO!.eventoDTO!.tematica}`, 10, yOffset, doc.internal.pageSize.width - 20);
      yOffset = addText(`Lista de: ${data[0].listaOcioDTO!.rppDTO!.nombre} ${data[0].listaOcioDTO!.rppDTO!.apellidos}`, 10, yOffset, doc.internal.pageSize.width - 20);
      yOffset = addText('Datos de Compra', 10, yOffset, doc.internal.pageSize.width - 20);

      if (data[0].promocionDTO) {
        yOffset = addText(`Promoción Aplicada: ${data[0].promocionDTO.tipoPromocion}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Detalle de la promoción: ${data[0].promocionDTO.titulo}`, 10, yOffset, doc.internal.pageSize.width - 20);
      }

      doc.setFontSize(12);
      for (const d of data) {
        if (yOffset > pageHeight - 20) {
          doc.addPage();
          yOffset = 10;
        }
        yOffset += 10;

        yOffset = addText(`Datos Asistente:`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Fecha de Compra: ${d.fecha?.substring(0, 10)}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Nombre Completo: ${d.datosCompradorDTO?.nombre} ${d.datosCompradorDTO?.apellidos}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Email: ${d.datosCompradorDTO?.email}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Teléfono: ${d.datosCompradorDTO?.telefono}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Fecha de Nacimiento: ${d.datosCompradorDTO?.fechaNacimiento?.substring(0, 10)}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Precio: ${d.listaOcioDTO?.precio}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Tipo de Entrada: Por Lista`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Descripción: ${d.listaOcioDTO?.detalleLista}`, 10, yOffset, doc.internal.pageSize.width - 20);
        yOffset = addText(`Consumiciones: ${d.listaOcioDTO?.consumiciones}`, 10, yOffset, doc.internal.pageSize.width - 20);
        await extracted(d);
      }

      doc.save('lista.pdf');
    }
  }


}
