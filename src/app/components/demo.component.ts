import { Component, ViewChild } from '@angular/core';
import { DynamicHtmlRendererComponent } from './dynamic-html-renderer.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  @ViewChild(DynamicHtmlRendererComponent) htmlRenderer!: DynamicHtmlRendererComponent;
  public showExamples: boolean = false;

  // Ejemplo del HTML que proporcionaste
  public sampleHtml: string = `<style>
.modal-header {
    border-bottom: none;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
}

.modal-header .close {
    background-color: transparent;
    border: 0;
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0;
    padding: 0;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    cursor: pointer;
}

.modal-header-circles span {
    display: inline-block;
    height: 6px;
    width: 6px;
    border: 1px solid #252626;
    border-radius: 50%;
}

.modal-content {
    background-color: #FFF;
    border: none;
    color: #484D45;
    border-radius: 10px;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
    font-family: "Roboto", sans-serif;
}

.modal-body {
    padding: 1rem;
}

.hsp-lightbox-default-title,
.hsp-lightbox-default-subtitle {
    font-family: 'Overpass', sans-serif;
    font-size: 1.75rem;
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
}

.hsp-lightbox-default-title+.hsp-lightbox-default-p {
    margin-top: 1rem;
}

.hsp-lightbox-default-title {
    font-weight: 700;
    margin-bottom: 0;
}

.hsp-lightbox-default-subtitle {
    font-weight: 300;
    margin-bottom: 1rem;
}

.hsp-lightbox-default-name {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 1.5rem 0 1rem;
    text-align: center;
}

.hsp-lightbox-default-p {
    font-size: 0.875rem;
    line-height: 1.25;
    min-height: 120px;
    text-align: justify;
}

.hsp-lightbox-default-p strong {
	color: #404040 !important;
}

.container-cta {
	position: relative;
    margin-bottom: 1rem;
    padding: 1rem 0;
    text-align: center;
    width: 300px;
    margin: 1rem auto;
}
.btn-cta {
    position: relative;
    background-color: #CA082C;
    border-radius: 50px;
    color: #fff;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1;
    text-decoration: none;
    padding: 1rem 4rem;
	display: block;
}
.btn-cta:hover {
	color: white;
	opacity: .7;
	
}
.gris-btn{
	color: #404040;
	background: #ccc;
	font-weight: 300;
}
.icono {
    position: absolute;
    top: 22px;
    right: -18px !important;
    height: 64px;
    width: 64px;
	max-width: 64px;
}
.txt-link{
	text-align: center;
}
.txt-link a{
	font-size: 12px;
	color: #0085B2;
	}
.mt{
	margin-top: 20px;
}
.no-mt{
	margin-top: 0 !important;
}
.no-mb{
	margin-bottom: 0 !important;
}
@media (min-width: 576px) {
	.modal-dialog {
		max-width: 500px;
		margin: 1.75rem auto;
	}
}
</style>
<div class="modal-content">
	<div class="modal-body">
		<h4 class="hsp-lightbox-default-title">¿Nuevas opciones de Ahorro e Inversión!</h4>
		<h6 class="hsp-lightbox-default-name">{nombre}</h6>
		<div class="hsp-lightbox-default-p">
			<p>¿Descubre las nuevas alternativas de ahorro e inversión que tenemos gracias
a nuestra alianza con <strong>Prudential AGF</strong> para ayudarte mejorar tu futura pensión y cumplir tus proyectos!</p>
			<p>Haz click en "Autorizo" si autorizas a que un ejecutivo de Prudential AGF te contacte vía correo, mensajería o teléfono y te entregue asesoría en sus productos de ahorro voluntario.</p>
		</div>
		<div class="container-cta mt no-mb">
			<a href="#" class="btn-cta" role="button" rel="noopener" onclick="javascript:MarcaResultadoModal(1);">
				Autorizo
			</a>
			<img src="https://www.afphabitat.cl/wp-content/uploads/2023/06/icono-boton-cta.png" class="icono"></img>
		</div>
				<div class="container-cta no-mt">
			<a href="#" class="btn-cta gris-btn" role="button" rel="noopener" onclick="javascript:MarcaResultadoModal(0);">
				No Autorizo
			</a>
		</div>
		<div class="txt-link">
				<a href="https://www.afphabitat.cl/contacto/" target="_blank">Esta autorización puede ser revocada en cualquier momento a través de nuestro formulario de Contacto</a>
		</div>
	</div>
</div>
<script type="text/javascript">
    llenarNombre();
</script>`;

  public currentHtml: string = '';

  constructor() {
    this.currentHtml = this.sampleHtml;
  }

  /**
   * Carga el HTML de ejemplo
   */
  public loadSampleHtml(): void {
    this.currentHtml = this.sampleHtml;
  }

  /**
   * Limpia el contenido
   */
  public clearContent(): void {
    this.currentHtml = '';
  }

  /**
   * Carga HTML personalizado
   */
  public loadCustomHtml(): void {
    const customHtml = prompt('Ingresa tu HTML personalizado:');
    if (customHtml) {
      this.currentHtml = customHtml;
    }
  }

  /**
   * Actualiza el contenido dinámicamente
   */
  public updateContent(): void {
    if (this.htmlRenderer) {
      this.htmlRenderer.updateContent(this.currentHtml);
    }
  }
}