var classroom=[];
var form=document.getElementById("form");

function new_field(){
      popup=document.getElementById("popup");
      popup.setAttribute("style","display:block");
      // console.log("popup")
}
function close_x(){
      popup=document.getElementById("popup");
      popup.setAttribute("style","display:none")
      // console.log("popup closed");
}
function add(){
    var person={};
    var input_name=document.getElementById("name").value;
    var input_email=document.getElementById("email").value;
    var input_phone=document.getElementById("phoneno").value;
    var input_rollno=document.getElementById("rollno").value;
person.name=input_name;
person.email=input_email;
person.phoneno=input_phone;
person.rollno=input_rollno;
      if(input_name==="" && input_email==="" && input_phone===""){
       alert("Fill the data..." )
      }
     else{
        classroom.push(person)
        // console.log("classroom",classroom)
        // insertObject(classroom, person)

      localStorage.setItem('classrooms', JSON.stringify(classroom));
      popup.setAttribute("style","display:none")
        student();
  //  form.reset();
  location.reload();
    }
}

       // ................................................................................................
        const asyncLocalStorage = {
          setItem: function (key, value) {
              return Promise.resolve().then(function () {
              localStorage.setItem(key, value);
              });
          },
          getItem: function (key) {
              return Promise.resolve().then(function () {
              return localStorage.getItem(key);
            
              });
          }
          // t_count:function (key){
          //   return Promise.resolve().then (function(){
          //     return localStorage.length(key);
          //   })
            
          // }
        }
      // ............................................................................................................
let getData = asyncLocalStorage.getItem('classrooms').then((data)=> {
        if(data !==null){
        classroom =JSON.parse(data);
        // console.log("classroom",classroom);
        }
 });  
//  let totalcount=asyncLocalStorage.t_count("classroom").then((data)=>{
// console.log("length",length);
//  })

// ......................................................................................................
 getData.then(()=>{
  state={
    "queryset": classroom,
      "rows":20,
      "page":1
  } 
  console.log("state.queryset",state.queryset)
  // console.log("length",state.queryset.length);
  student();
})
function pagination(queryset, rows,page){
  //  console.log("pagination__outpage",page)

return new Promise(function (fulfilled, rejected) {
  // console.log("state.page",state.page)
  
      var page= state.page;
      var start =(page-1)*rows;
      var end=start+rows;
      var trim_Data= queryset.slice(start,end);
      var page=Math.ceil(queryset.length/rows);
      // console.log("start",start)
      // console.log("trim_Data",trim_Data)
      // console.log("rows",rows)
      fulfilled ({
        "queryset":trim_Data,
        "pages":page,
        "rows":rows
    })
  })
}   
$(document).ready(function(){
   console.log("length",state.queryset.length);
 let tcount=  document.getElementById("total_count")
     tcount.innerHTML=state.queryset.length;
})

// .................................array push doesnot work use this method for pushing object into array...............................
// function insertObject(classroom, person) {
//   console.log("person",person);
//   // append object
//    classroom = [...classroom, person];
// }
// ...........................................................................................................
 
    // var data=pagination(state.queryset,state.rows,state.page)
    //       console.log("data",data)
    // ............................................................................
  async function sort(){
  // console.log("sort worked")
  // console.log("classroom",classroom)
  // console.log("person.id",person.id)
   let sorted;
   sorted = (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
   classroom.sort(sorted);
   student();
 }
async function rollno_sort(){
      let item= classroom.sort((a, b)=>  a.rollno - b.rollno ); 
      console.log("item",item);
      student();
}
async function rollno_reverse(){
  let item= classroom.sort((a, b)=>  b.rollno - a.rollno ); 
  console.log("item",item);
  student();
}
// ................................................................................
   function reverse(){
      // console.log("reversed")
      let reverse = (a, b) => a.name.toLowerCase() <  b.name.toLowerCase() ? 1 : -1;
      classroom.sort(reverse);
      // console.log( classroom.sort(reverse));
      student();
      
   }
// ......................................search field show.......................................................................................................................
function search(){
  // console.log("serach field")
  var search_field=document.getElementById("search_field");
  search_field.setAttribute("style","display:block");
}
// .....................................search data............................................................
const input_search=document.getElementById("input");
input_search.addEventListener("input",search_word);

async function search_word(event){
      // console.log(event.target.value) 
  var e_length=event.target.value;
 
//  console.log( "eventlength",eee.length);
    var person_list= document.getElementById("person_list");
        person_list.innerHTML="";

        display = classroom.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()))
        console.log("display",display)
  // {/* {name: 'Caleb ', email: 'sawerifa@mailinator.com', phoneno: '+1 (667) 282-8989', rollno: '536'} */}
 
  // .......................................................................................................................
  if(e_length.length > 0){
  if(display.length > 0){
    console.log("its_working");
  person_list.innerHTML+=`<tr>
                          <th>Rollno <i class="bi bi-caret-down"onclick="rollno_reverse()"></i>
                          <i class="bi bi-caret-up" onclick="rollno_sort()"></i> </th>
                          <th>name<i class="bi bi-caret-down" onclick="reverse()"></i>
                                  <i class="bi bi-caret-up" onclick="sort()"></i> </th>
                          <th>email</th>
                          <th>phoneno</th>
                          <th>Action<i class="bi bi-search" onclick="search()"></i></th>
                          </tr>`;
    display.forEach(row=> {
         person_list.innerHTML+=`<tr>
           <td>${row.rollno}</td>
           <td>${row.name}</td>
           <td>${row.email}</td>
           <td>${row.phoneno}</td>
           <td><div class="dropdown">
                      <button class="dropbtn">Action<i class="bi bi-caret-down"></i></button>
                                        <div class="dropdown-content">
                                        <a onclick="edit_value(${row.rollno})">Edit</a>
                                        <a onclick="deleted(${row.rollno})">Delete</a>
                                        </div>    
                      </div></td>
           </tr>` 
          })
        }
      
  else{
      person_list.innerHTML=`<div class="no_data"> no result is found...<div>`
  }
}
else{
student(); 
}
}
  // .....................................................table data.................................................
async function student(){
var person_list= document.getElementById("person_list");
           person_list.innerHTML="";
           var page_nation=await pagination(state.queryset,state.rows,state.page)
          //  console.log("datapagination instudent",page_nation);
            var classroom= page_nation.queryset;
            //  console.log("page_nation.queryset",page_nation.queryset)
            //  console.log("page_nation.pages",page_nation.pages)
       
            person_list.innerHTML+=`<tr>
            <th>Rollno <i class="bi bi-caret-down"onclick="rollno_reverse()"></i>
                       <i class="bi bi-caret-up" onclick="rollno_sort()"></i> </th>
            <th>name <i class="bi bi-caret-down"onclick="reverse()"></i>
                     <i class="bi bi-caret-up" onclick="sort()"></i> </th>
            <th>email</th>
            <th>phoneno</th>
            <th>Action<i class="bi bi-search" onclick="search()"></i></th></tr>`
    for(i=0;i<=classroom.length-1;i++){
      //  console.log("classroom[i].id",classroom[i].id);
                      person_list.innerHTML+=`
                      <tr>
                      <td>${classroom[i].rollno}</td>
                      <td>${classroom[i].name}</td>
                      <td>${classroom[i].email}</td>
                      <td>${classroom[i].phoneno}</td>
                      <td><div class="dropdown">
                      <button class="dropbtn">Action<i class="bi bi-caret-down"></i></button>
                                        <div class="dropdown-content">
                                        <a onclick="edit_value(${classroom[i].rollno})">Edit</a>
                                        <a onclick="deleted(${classroom[i].rollno})">Delete</a>
                                        </div>
                      </div></td>
                      </tr>`;
    //  console.log("after",classroom[i]);
}
 // <td><button onclick="edit_value(${classroom[i].rollno})"><i class="bi bi-pencil-fill"></i></button>
                      //     <button onclick="deleted(${classroom[i].rollno})"><i class="bi bi-trash"></i></button></td> 
                     
// button(pages)

  button(page_nation.pages)
 
}
// .........................................edit value ..............................................................
function edit_value(index){
        //  console.log(classroom)
        //  console.log("index",index)
                  classroom.filter((item)=>{
                          if(item.rollno==index){
                            //  console.log( "index",item.name + item.email + item.phoneno)
                                document.getElementById("rollno").value= item.rollno,
                                document.getElementById("name").value= item.name,
                                document.getElementById("email").value=item.email;
                                document.getElementById("phoneno").value=item.phoneno;
                        }
                  })
      var update=document.getElementById("update");
      update.setAttribute("style", "display:block")

      var submit=document.getElementById("submit");
      submit.setAttribute("style", "display:none")

    
  popup.setAttribute("style","display:block")
  update.setAttribute("onclick",`updated("${index}")`);
  // console.log( "after indexs",index);
}   
// .......................update.........................................................................................
function updated(index){
   console.log( "after --index",index);
      var update=document.getElementById("update");
      update.setAttribute("style", "display:none")
      var submit=document.getElementById("submit");
      submit.setAttribute("style", "display:block");
     popup.setAttribute("style","display:none")
//  console.log("index",index)
//  console.log(classroom)
 classroom.filter((item)=>{
                          if(item.rollno===index){
                           console.log( "index",item.name + item.email + item.phoneno)
                          item.name=document.getElementById("name").value;
                          item.email= document.getElementById("email").value;
                          item.phoneno= document.getElementById("phoneno").value;
                          console.log( " afterindex",item.name + item.email + item.phoneno)
                        }
                  })
            // form.reset();
            localStorage.setItem('classrooms', JSON.stringify(classroom));
            student();
}
// ........................delete.................................................................
function deleted(index){
  console.log("deleteindex",index)
  var result = confirm("if you want to delete the information?");
           if (result){
            
   classroom=classroom.filter((item) =>{
             if(item.rollno != index){
                  // console.log(item)
                  return item
                } 
        })    
      } console.log(classroom)   
              
              // console.log(classroom.splice(index,1))
                localStorage.setItem('classrooms', JSON.stringify(classroom));
                location.reload();
               student();
           }

// ........................................................................................
// var data=pagination(state.queryset,state.rows,state.page)
// console.log("data",data)
function button(pages){
  // console.log("button working")
  var page_button= document.getElementById("pagination"); 
  page_button.innerHTML=" ";

      for(var page=1; page<=pages; page++){
          //  conso1e.log("${page value=}",page)
          //  console.log("${pages}",pages)
          page_button.innerHTML+=`<button value=${page} class="pages">${page}</button>`;
     }
      // console.log("page working")

     $(".pages").on("click",function(){
        // console.log("page 2working")
           $("#result").empty();
          // console.log('$("#result").remove()',  $("#result").remove())
          state.page=$(this).val()
          console.log(" state.page", state.page)
         student()
      })
  }

  

// .........................................................................................................................

// ................................................... 