const btnTambah = document.querySelector('.btn-tambah'),
    inputTambah = document.querySelector('#tambahkan'),
    listItem = document.querySelector('#list-item'),
    itemEdit = document.querySelector('.item')



const produk = []

function showItem() {

    document.querySelectorAll('.item').forEach(item => item.remove())
    produk.forEach((item, i) => {
        let tagDiv = `
       
        
        <div class="item">
        <div class="item-edit">
            <form>
            <input type='text' id='editnih'/>
            <button class='edit-aksi'>Edit</button>
            <button class='close'>x</button>
            </form>
        </div>
            <h2> - ${item.barang}</h2>
            <p class='hapus' onclick="hapusBarang(${i})">Hapus</p>
            <p class='edit' onclick="editBarang(${i},'${item.barang}',this)">Edit</p>
          </div>
        `
        listItem.insertAdjacentHTML('afterbegin', tagDiv)
    })

}

showItem()

function hapusBarang(id) {
    let jawab = confirm('yakin ingin menghapus ? ')
    if (jawab === true) {
        produk.splice(id, 1)
        showItem()
    } else {
        alert('wokai')
        return false

    }

}


function editBarang(id, barang, elem) {
    let objElem = elem.parentElement
    const close = objElem.querySelector('.close')
    const update = objElem.querySelector('.edit-aksi')
    // console.log(update)
    // let idBarang = id,
    //     namaBarang = barang

    objElem.querySelector('h2').style.display = 'none'
    objElem.querySelector('.edit').style.display = 'none'
    objElem.querySelector('.hapus').style.display = 'none'
    objElem.querySelector('.item-edit').style.display = 'block'
    objElem.querySelector('.item-edit input').value = barang
    document.addEventListener('click', e => {
        if (e.target === objElem.querySelector('.item-edit input')) {
            objElem.querySelector('.item-edit').style.display = 'block'

        } else if (e.target != elem) {
            objElem.querySelector('h2').style.display = 'flex'
            objElem.querySelector('.edit').style.display = 'flex'
            objElem.querySelector('.hapus').style.display = 'flex'
            objElem.querySelector('.item-edit').style.display = 'none'
            objElem.querySelector('.item-edit input').value = ''
        } else {
            objElem.querySelector('.item-edit input').value = barang
        }
    })

    update.addEventListener('click', e => {
        e.preventDefault()
        let infoUpdate = {
            barang: objElem.querySelector('.item-edit input').value
        }
        // console.log(infoUpdate)

        produk[id] = infoUpdate

        showItem()
    })

    close.addEventListener('click', e => {
        e.preventDefault()
    })

}

btnTambah.addEventListener('click', e => {
    e.preventDefault()
    let namaBarang = inputTambah.value
    if (namaBarang) {
        let infoBarang = {
            barang: namaBarang
        }

        if (produk.find(item => item.barang === namaBarang)) {
            document.querySelector('.error-barang').style.display = 'block'
        } else {
            btnTambah.innerText = 'Bentar'
            setTimeout(() => {
                let produkObj = JSON.stringify(infoBarang)
                let produkFix = JSON.parse(produkObj)
                produk.push(produkFix)
                console.log(produk)
                btnTambah.innerText = 'Tambah'
                clearInput()
                showItem()
            }, 1000);
        }
    }
})

function search() {
    const searchItem = document.getElementById('searchItem').value.toUpperCase(),
        listItem = document.getElementById('list-item'),
        item = document.querySelectorAll('.item'),
        name = listItem.getElementsByTagName('h2')

    for (let i = 0; i < name.length; i++) {
        let match = item[i].getElementsByTagName('h2')[0]

        if (match) {
            let textValue = match.textContent || match.innerHTML || match.innerText

            if (textValue.toUpperCase().indexOf(searchItem) > -1) {
                item[i].style.display = ''
            } else {
                item[i].style.display = 'none'
            }
        }

    }
}


function clearInput() {
    inputTambah.value = ''
    document.querySelector('.error-barang').style.display = 'none'
}