document.addEventListener("DOMContentLoaded", () => {
    const addItemButton = document.querySelector("button[mySubmit1]");
    const itemNameInput = document.getElementById("item-name");
    const itemImageInput = document.getElementById("image");
    const itemDescriptionInput = document.getElementById("item-description");
    const itemPriceInput = document.getElementById("item-price");
    const tableContent = document.getElementById("tableContent");

    // Create and append a table for items
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.margin = "auto";
    table.style.width="500px";


    // Create the table header
    const headerRow = document.createElement("tr");
    ["Item Name", "Image", "Description", "Price"].forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    tableContent.appendChild(table);

    // Add event listener to the button
    addItemButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission

        const itemName = itemNameInput.value;
        const itemImage = itemImageInput.files[0];
        const itemDescription = itemDescriptionInput.value;
        const itemPrice = itemPriceInput.value;

        if (!itemName || !itemImage || !itemDescription || !itemPrice) {
            alert("Please fill out all fields and upload an image.");
            return;
        }

        // Parse the description into a structured format
        const descriptionLines = itemDescription.split("\n").map(line => {
            const [key, value] = line.split("=").map(str => str.trim());
            return key && value ? `${key}: ${value}` : line; // Ensure proper formatting
        });

        // Create a new row for the table
        const row = document.createElement("tr");

        // Add item name
        const nameCell = document.createElement("td");
        nameCell.textContent = itemName;
        row.appendChild(nameCell);

        // Add item image
        const imageCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = URL.createObjectURL(itemImage);
        img.alt = "Item Image";
        img.style.width = "100px";
        img.style.height = "100px";
        imageCell.appendChild(img);
        row.appendChild(imageCell);

        // Add structured description
        const descriptionCell = document.createElement("td");
        const descriptionList = document.createElement("ul");
        descriptionLines.forEach(line => {
            const listItem = document.createElement("li");
            listItem.textContent = line;
            descriptionList.appendChild(listItem);
        });
        descriptionCell.appendChild(descriptionList);
        row.appendChild(descriptionCell);

        // Add item price
        const priceCell = document.createElement("td");
        priceCell.textContent = itemPrice;
        row.appendChild(priceCell);

        // Append the row to the table
        table.appendChild(row);

        // Clear the input fields
        itemNameInput.value = "";
        itemImageInput.value = "";
        itemDescriptionInput.value = "";
        itemPriceInput.value = "";
    });
});
document.getElementById('mySubmit1').addEventListener('mousedown', function () {
    alert('You change this anytime...')
    const companyName= document.getElementById('company-name').value;
    const companyDescription= document.getElementById('company-description').value;
    const contactInfo=document.getElementById('contact-info').value;
    const locationInfo=document.getElementById('location').value;
    document.getElementById('companyDescription').textContent=companyDescription,
document.getElementById('companyName').textContent=companyName;
document.getElementById('contactInfo').textContent=contactInfo;
document.getElementById('locationInfo').textContent=locationInfo;
document.getElementById('toggleClose').textContent="";


    // body...
});
document.getElementById("myDownload1").onclick = function () {
    const downloadItem = document.getElementById("downloadItem"); // Reference the target element

    html2canvas(downloadItem, {
        scale: 3, // Increase scale for higher resolution
        useCORS: true // Ensure cross-origin images are included
    }).then(canvas => {
        // Convert canvas to image and trigger download
        const image = canvas.toDataURL("image/png"); // Convert canvas to PNG format
        const link = document.createElement("a");
        link.href = image;
        link.download = "Alipricetag.png"; // Set the downloaded file name
        link.click(); // Trigger the download
    }).catch(error => console.error("Error generating image:", error));
};
