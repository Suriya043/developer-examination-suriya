// let endpoint = "http://128.199.80.110:12111";
let endpoint = "http://localhost:3000";

$(document).ready(function () {
  renderTable();
});

const renderTable = () => {
  fetch(endpoint + "/get_item")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("table-body");
      tableBody.innerHTML = "";
      data.data.forEach((item) => {
        const row = `
            <tr style="cursor: pointer" onclick="getItemById('${item._id}')">
              <td class="col-4 text-start border-start border-end">${item.name}</td>
              <td class="col-2 text-end border-end">${item.price}</td>
              <td class="col-2 text-end border-end">${item.quantity}</td>
              <td class="col-3 text-center border-end"><button type="button" class="btn btn-warning" onclick="openModalUpdate(event,'${item._id}')">Edit Item</button></td>
            </tr>
          `;
        tableBody.innerHTML += row;
      });
    })
    .catch((error) => console.error(error));
};

const getItemById = (_id) => {
  fetch(endpoint + `/get_item_by_id/${_id}`)
    .then((response) => response.json())
    .then((data) => {
      let result = data.data;
      document.getElementById("item-modal-id").innerHTML = result._id;
      document.getElementById("item-modal-name").innerHTML = result.name;
      document.getElementById("item-modal-price").innerHTML = result.price;
      document.getElementById("item-modal-quantity").innerHTML = result.quantity;
      document.getElementById("item-modal-description").innerHTML = result.description;
      $("#item-modal").modal("show");
    });
};

const clearModalInsert = () => {
  document.getElementById("nameInput").value = "";
  document.getElementById("priceInput").value = "";
  document.getElementById("quantityInput").value = "";
  document.getElementById("descriptionInput").value = "";
};

const insertItem = () => {
  var name = document.getElementById("nameInput").value;
  var price = document.getElementById("priceInput").value;
  var quantity = document.getElementById("quantityInput").value;
  var description = document.getElementById("descriptionInput").value;

  if (name.trim() == "" || price.trim() == "" || quantity.trim() == "" || description.trim() == "") {
    alert("Please enter all fields.");
    return;
  }

  let data = {
    name: name,
    price: price,
    quantity: quantity,
    description: description,
  };

  fetch(endpoint + "/insert_item", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      $("#insertModal").modal("hide");
      renderTable();
      clearModalInsert();
    })
    .catch((error) => {
      alert("Error: " + error);
    });
};

const openModalUpdate = (event, _id) => {
  event.stopPropagation();
  fetch(endpoint + `/get_item_by_id/${_id}`)
    .then((response) => response.json())
    .then((data) => {
      let result = data.data;
      document.getElementById("nameUpdate").value = result.name;
      document.getElementById("priceUpdate").value = result.price;
      document.getElementById("quantityUpdate").value = result.quantity;
      document.getElementById("descriptionUpdate").innerHTML = result.description;
      const updateBtn = document.getElementById("updateBtn");
      updateBtn.addEventListener("click", () => {
        updateItem(_id);
      });
      $("#updateModal").modal("show");
    });
};

const updateItem = (_id) => {
  var name = document.getElementById("nameUpdate").value;
  var price = document.getElementById("priceUpdate").value;
  var quantity = document.getElementById("quantityUpdate").value;
  var description = document.getElementById("descriptionUpdate").value;

  if (name.trim() == "" || price.trim() == "" || quantity.trim() == "" || description.trim() == "") {
    alert("Please enter all fields.");
    return;
  }

  let data = {
    id: _id,
    name: name,
    price: price,
    quantity: quantity,
    description: description,
  };

  fetch(endpoint + "/update_item", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      $("#updateModal").modal("hide");
      renderTable();
    })
    .catch((error) => {
      alert("Error: " + error);
    });
};
