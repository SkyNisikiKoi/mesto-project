
  function showForm() {
    let doc = document.getElementById("edit-form");
    doc.style.display = "block";
    doc.style.zIndex = "9999";

    let shadow = document.getElementsByClassName("shadow")[0];
    shadow.style.zIndex = "9998";
  }

  function hideForm() {
    let doc = document.getElementById("edit-form");
    doc.style.display = "none";

    let shadow = document.getElementsByClassName("shadow")[0];
    shadow.style.zIndex = "-1";
  }

