// const boxBtn = document.querySelector('.add-box'),
//     popupBox = document.querySelector('.popup-box'),
//     closeBtn = popupBox.querySelector('header p'),
//     inputTitle = popupBox.querySelector('input'),
//     inputDesc = popupBox.querySelector('textarea'),
//     addBtn = popupBox.querySelector('button')

// const bulans = ['januari','Febuari','Maret','April']
// const namaHaris = ['minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']
// const notes = JSON.parse(localStorage.getItem('notes') || '[]')

// boxBtn.addEventListener('click', () => {
//     popupBox.classList.add('show')
// })

// function showNotes() {
//     document.querySelectorAll('.note').forEach(note => note.remove())
//     notes.forEach((note)=>{
//         let divTag =   `<div class="note">
//             <p>${note.judul}</p>
//             <p>${note.desc}</p>
//             <p>${note.tanggal}</p>
//         </div>`

//         boxBtn.insertAdjacentHTML('afterend',divTag)
//     })
// }

// showNotes()

// closeBtn.addEventListener('click', () => {
//     inputTitle.value = ''
//     inputDesc.value = ''
//     popupBox.classList.remove('show')
// })

// addBtn.addEventListener('click', (e) => {
//     e.preventDefault()
//     let noteTitle = inputTitle.value,
//         noteDesc = inputDesc.value,
//         objDate = new Date(),
//         bulan = bulans[objDate.getMonth()],
//         hari = objDate.getDate(),
//         tahun = objDate.getFullYear(),
//         namaHari = namaHaris[objDate.getDay()]

//     let noteInfo = {
//         judul: noteTitle,
//         desc: noteDesc,
//         tanggal: `${namaHari} ${hari} ${bulan} ${tahun}`
//     }

//     notes.push(noteInfo)

//     localStorage.setItem('notes', JSON.stringify(notes))

//     closeBtn.click()
//     showNotes()
// })

const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupText = popupBox.querySelector("header h2"),
  closeBtn = popupBox.querySelector("header p"),
  inputTitle = popupBox.querySelector("input"),
  inputDesc = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

const namaBulan = ["Januari", "Febuari", "Maret"];
const namaHari = ["Minggu", "Senin", "Selasa"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  inputTitle.focus();
  popupBox.classList.add("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((n) => n.remove());
  notes.forEach((note, index) => {
    let tagDiv = `<div class='note'>
        <p>${note.judul}</p>
        <p>${note.desc}</p>
        <p>${note.tanggal}</p>
        <div class="aksi">
        <span onclick="showAksi(this)">open aksi</span>
            <div class="aksi-btn">
                <p class="hapus" onclick="deleteNote(${index})">hapus</p>
                <p onclick="editNote(${index}, '${note.judul}','${note.desc}')")>edit</p>
            </div>
        </div>
        </div>`;
    addBox.insertAdjacentHTML("afterend", tagDiv);
  });
}

showNotes();

closeBtn.addEventListener("click", () => {
  isUpdate = false;
  inputTitle.value = "";
  inputDesc.value = "";
  addBtn.innerText = "simpan";
  popupText.innerText = "add";
  popupBox.classList.remove("show");
});

function showAksi(elem) {
  elem.parentElement.classList.add("show");

  document.addEventListener("click", (e) => {
    if (e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
      notes.splice(noteId, 1);
      localStorage.setItem("notes", JSON.stringify(notes));

      showNotes();
    } else {
      swal("Your imaginary file is safe!");
      showNotes();
    }
  });
}

function editNote(noteId, judul, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  inputTitle.value = judul;
  inputDesc.value = desc;
  addBtn.innerText = "update";
  popupText.innerText = "update";
  console.log(noteId, judul, desc);
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let tanggal = new Date(),
    hari = namaHari[tanggal.getDay()],
    bulan = namaBulan[tanggal.getMonth()],
    tanggalBulan = tanggal.getDate(),
    tahun = tanggal.getFullYear(),
    noteTitle = inputTitle.value,
    noteDesc = inputDesc.value;

  let infoNote = {
    judul: noteTitle,
    desc: noteDesc,
    tanggal: `${hari} ${tanggalBulan} ${bulan} ${tahun} `,
  };
  if (!isUpdate) {
    notes.push(infoNote);
    swal("note berhasil di tambah");
  } else {
    isUpdate = true;
    notes[updateId] = infoNote;
    swal("note berhasil di ubah");
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  closeBtn.click();
  showNotes();
});
