class ListaTareas{
    constructor(){
        this.tareas=JSON.parse(localStorage.getItem('tareas'));

        if(!this.tareas){
            this.tareas=[
                {tarea: 'Aprender JavaScript',
                completado: false},
                {tarea: 'Aprender python',
                completado: false},
                {tarea: 'Aprender c++',
                completado: true},
                
            ];
        }

        this.cargarTareas();
        this.agregarEventListeners();
    }
    agregarEventListeners(){
        document.getElementById('recordatorio').addEventListener('keypress',(evento)=>{
            if(evento.keyCode == 13){
                this.agregarTarea(evento.target.value);
                evento.target.value = '';
            }
        })
    }

}

let listaTareas;

window.addEventListener('load',() => {
    listaTareas = new ListaTareas();

})
