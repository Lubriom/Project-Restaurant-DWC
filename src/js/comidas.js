import "/node_modules/jquery/dist/jquery.min.js";
import "/DataTables/datatables.min.js";
import "/bootstrap/js/bootstrap.bundle.min.js";

$("#myTable").DataTable({
  ajax: {
    url: "/data.json",
    dataSrc: ""
  },
  columns: [{ data: "Producto" }, { data: "Precio" }, { data: "Categoria" }],
  responsive: true,
  ordering: false
});
