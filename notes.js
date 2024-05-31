const btn=document.querySelector("#addnote");
const main=document.querySelector(".main");

btn.addEventListener("click",
function(){
    addnote();
}
)

const savenote=()=>{
    const notes=document.querySelectorAll(".note textarea");
    const data=[];
    notes.forEach(  
        (notes)=>{
            data.push(notes.value);
    })
     if(data.length ===0){
         localStorage.removeItem("notes")
     }else{
     localStorage.setItem("notes",JSON.stringify(data));
     }
}

const addnote=(text="")=>{
    const note=document.createElement("div");
    note.classList.add("note");
    note.innerHTML=`
     <div class="notes">
    <div class="navbar">
        <i class="fa-solid fa-trash"id="trash"></i>
        <i class="fa-solid fa-floppy-disk"id="save"></i>
    </div>
    <textarea id="notearea">${text}</textarea>
</div> 
    `
    note.querySelector("textarea").addEventListener("focusout",
    function(){
    savenote();
    }
    )

    main.appendChild(note);
    savenote();
    note.querySelector("#trash").addEventListener("click",
    function(){
        note.remove();
        savenote();
    }
    )
    note.querySelector("#save").addEventListener("click",
    function(){
        savenote();
    }
    )
}

// user jab page par aye to usko note dikhne chahiye islye hum self calling function banainge..
 //  for data exist after refresh we pass lsnotes in addnote()
// for ek na ek text area ls mein rehna chahiye.
(
    function(){
        const lsnotes=JSON.parse(localStorage.getItem("notes"));
            if(lsnotes===null){
                addnote();
            }else{
                lsnotes.forEach(
                    (lsnotes)=>
                    {
                        addnote(lsnotes);
                    }
                    )
            }
    }
)()   