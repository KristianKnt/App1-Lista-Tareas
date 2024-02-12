class ListaTareas{
    constructor(){
        this.tareas = JSON.parse(localStorage.getItem('tareas'));
        // if tareas is empy for default create three "tareas"
        if (!this.tareas) {
            this.tareas = [
                {tarea: 'Aprender JavaScript', completado: false},
                {tarea: 'Aprender Python', completado: false},
                {tarea: 'Aprender C++', completado: true}
            ];
        }

        this.cargarTareas();
        this.agregarEventListeners();
    }
    // function for create new events or tareas!
    agregarEventListeners() {
        document.getElementById('recordatorio').addEventListener('keypress', (evento) => {
            if(evento.keyCode == 13){
                this.agregarTarea(evento.target.value);
                evento.target.value = '';
            }
        });
    }

    cargarTareas() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
        let htmlTareas = this.tareas.reduce((html, tarea, indice) => html += this.generarHtmlTarea(tarea, indice), '');
        document.getElementById('listaTareas').innerHTML = htmlTareas;
    }

    cambiarEstadoTarea(indice) {
        this.tareas[indice].completado = !this.tareas[indice].completado;
        this.cargarTareas();

    }

    eliminarTarea(evento, indice) {
        evento.preventDefault();// evita que se transite a otra pagina?
        this.tareas.splice(indice, 1);//elimina o remueve el contenido de un arreglo 
        this.cargarTareas();// se llama el metodo para que se recarge.
    }

    generarHtmlTarea(tarea, indice) {
        return `
            <li class="list-group-item checkbox>
                <div class="container">
                    <div class="row">
                        <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                            <label>
                                <input id="cambiarEstadoTarea" type="checkbox" onchange="listaTareas.cambiarEstadoTarea(${indice})" value="" class="caja-comprobacion" ${tarea.completado ? 'checked': ''}>
                            </label>
                        </div>
                        <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 texto-tarea ${tarea.completado ? 'tarea-completada' : ''}">
                            ${tarea.tarea}
                        </div>
                        <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 area-icono-eliminacion">
                            <a class="" href="/" onclick="listaTareas.eliminarTarea(event, ${indice})">
                                <i id="eliminarTarea" data-id=${indice} class="fas fa-trash-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        `;
    }

    agregarTarea(tarea) {
        let padre = document.getElementById('recordatorio').parentElement;

        if (tarea !== ''){
            padre.classList.remove('has-error');

            let nuevaTarea = {
                tarea,
                completado: false
            };

            this.tareas.push(nuevaTarea);
            this.cargarTareas();
        } else {
            padre.classList.add('has-error');
        }
    }
    /**
     * metodo para tomar el valor del recuado y el llamado del metodo agregarTarea validanddse
     * por el if si no esta vacio llama al metodo
     */
    agregarTareaClick() {
        let recordatorio = document.getElementById('recordatorio');
        let tarea = recordatorio.value;
        if (tarea){
            this.agregarTarea(tarea);
            recordatorio.value = '';
        }
    }
}
// create variable called listaTareas for save instances "ListaTareas"
let listaTareas;

window.addEventListener('load', () => {
    listaTareas = new ListaTareas();
})