const urlconfirmation = document.location;
const url = new URL(urlconfirmation);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;