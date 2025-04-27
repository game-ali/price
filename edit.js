document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.querySelector("button.edit");
    const deleteButton = document.querySelector("button.delete");
    const tableContent = document.getElementById("tableContent");

    let actionMode = null; // Track whether the user wants to edit or delete a cell or image

    // Handle Edit Button Click
    editButton.addEventListener("click", () => {
        actionMode = "edit";
        alert("Click on the cell, image, or description item you want to edit.");
    });

    // Handle Delete Button Click
    deleteButton.addEventListener("click", () => {
        actionMode = "delete";
        alert("Click on the cell, image, or description item you want to delete.");
    });

    // Handle Clicks on Table Content
    tableContent.addEventListener("click", (event) => {
        const target = event.target;

        if (actionMode === "edit") {
            if (target.tagName === "TD") {
                editCell(target);
            } else if (target.tagName === "IMG") {
                editImage(target);
            } else if (target.tagName === "LI") {
                editDescriptionItem(target);
            }
        } else if (actionMode === "delete") {
            if (target.tagName === "TD") {
                deleteCell(target);
            } else if (target.tagName === "IMG") {
                deleteImage(target);
            } else if (target.tagName === "LI") {
                deleteDescriptionItem(target);
            }
        }
    });

    // Function to Edit Cell Content
    function editCell(cell) {
        const oldValue = cell.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = oldValue;

        cell.textContent = "";
        cell.appendChild(input);

        input.focus();

        input.addEventListener("blur", () => {
            cell.textContent = input.value;
            actionMode = null; // Reset action mode
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                cell.textContent = input.value;
                actionMode = null; // Reset action mode
            }
        });
    }

    // Function to Edit Image
    function editImage(image) {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        image.parentElement.appendChild(fileInput);

        fileInput.addEventListener("change", () => {
            const newImage = document.createElement("img");
            newImage.src = URL.createObjectURL(fileInput.files[0]);
            newImage.alt = "Updated Image";
            newImage.style.width = "100px";
            newImage.style.height = "100px";

            image.parentElement.replaceChild(newImage, image);
            fileInput.remove();
            actionMode = null; // Reset action mode
        });
    }

    // Function to Edit Individual Description Item
    function editDescriptionItem(item) {
        const oldValue = item.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = oldValue;

        item.textContent = "";
        item.appendChild(input);

        input.focus();

        input.addEventListener("blur", () => {
            item.textContent = input.value;
            actionMode = null; // Reset action mode
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                item.textContent = input.value;
                actionMode = null; // Reset action mode
            }
        });
    }

    // Function to Delete Cell Content
    function deleteCell(cell) {
        const confirmDelete = confirm("Are you sure you want to delete this cell?");
        if (confirmDelete) {
            cell.textContent = "";
            actionMode = null; // Reset action mode
        }
    }

    // Function to Delete Image
    function deleteImage(image) {
        const confirmDelete = confirm("Are you sure you want to delete this image?");
        if (confirmDelete) {
            image.remove();
            actionMode = null; // Reset action mode
        }
    }

    // Function to Delete Individual Description Item
    function deleteDescriptionItem(item) {
        const confirmDelete = confirm("Are you sure you want to delete this description item?");
        if (confirmDelete) {
            item.remove();
            actionMode = null; // Reset action mode
        }
    }
});
 document.getElementById("myDownload").onclick = function () {
    const downloadItem = document.getElementById("downloadItem"); // Ensure correct reference to the ID

    const opt = {
        margin: 1,
        filename: 'Alipricetag.pdf',
        html2canvas: {
            scale: 3, // Increase scale for higher resolution
            useCORS: true // Ensures cross-origin images are included
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        }
    };

    // Use html2pdf with error handling for better quality
    html2pdf()
        .set(opt)
        .from(downloadItem)
        .save()
        .catch(error => console.error("Error generating PDF:", error));
};