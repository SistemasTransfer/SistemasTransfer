let dataTable;
let dataTableIsInitialized = false;

 const dataTableOpcions={
    pageLength: 5,
    destroy:true,
    responsive: true,
    language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
    }
 };
const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listUsers();

    dataTable = $("#datatable_users").DataTable(dataTableOpcions,
       
    );
    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        let content = "";
        users.forEach((user) => {
            content += `
            <tr>
            <td class="centered">
                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash"></i></button>
                </td>
                <td><a href="personal.html?id=${user.id}" class="text-decoration-none text-black" >${user.id}</a></td> 
                <td><a href="personal.html?id=${user.id}" class="text-decoration-none text-black">${user.name}</a></td>
                <td>${user.address.city}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                
            </tr>`;
        });
        document.getElementById("tableBody_users").innerHTML = content;
    } catch (ex) {
        alert("Error al listar usuarios: " + ex.message);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});
