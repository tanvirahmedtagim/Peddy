//Fetch and load button data and display button
const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayData(data.categories);
};
const displayData = (items) => {
  const buttonContainer = document.getElementById("button");

  items.forEach((item) => {
    const { category_icon, category } = item;

    const button = document.createElement("div");
    button.innerHTML = `<button id="btn-${category.toLowerCase()}" onclick="loadCategory('${category.toLowerCase()}')" class="btn w-full px-8 h-16 flex gap-3 items-center category-btn">
              <img class="w-8 h-8" src="${category_icon}" alt="" />
            <p class="text-xl font-black">${category}</p>
          </button>`;

    buttonContainer.append(button);
  });
};

//fetch and Load all pets and display those pets
const loadAllPets = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  displayAllPets(data.pets);
  sortByPrice(data.pets);
};

const displayAllPets = (pets) => {
  const petsContainer = document.getElementById("display-pets");
  document.getElementById("spinner").classList.add("hidden");
  document.getElementById("display-pets").classList.remove("hidden");
  document.getElementById("liked").classList.remove("hidden");
  petsContainer.innerHTML = "";

  if (pets.length == 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
    <div class="min-h-[300px] w-11/12 mx-auto flex justify-center items-center flex-col">
    <img src="./images/error.webp"/>
    <h2 class="font-bold text-2xl text-center w-1/2 mx-auto">No Information Available</h2>
    </div>`;
  } else {
    petsContainer.classList.add("grid");
  }
  pets.forEach((pet) => {
    const { image, pet_name, breed, date_of_birth, gender, price, petId } = pet;

    const pets = document.createElement("div");
    pets.innerHTML = `    <div
      class="p-5 flex flex-col gap-2.5 col-span-1 border-2 border-gray-200 rounded-xl"
    >
      <img
        class="w-full h-[160px] rounded-lg object-cover"
        src=${image}
        alt=""
      />
      <h2 class="font-bold text-xl">${pet_name}</h2>
      <p class="flex gap-2 items-center text-gray-500">
        <img
          class="w-6 h-6"
          src="https://cdn-icons-png.flaticon.com/128/5997/5997060.png"
          alt=""
        />Breed: ${breed ? breed : "N/A"}
      </p>
      <p class="flex gap-2 items-center text-gray-500">
        <img
          class="w-6 h-6"
          src="https://img.icons8.com/?size=24&id=117765&format=png"
          alt=""
        />Birth: ${date_of_birth ? date_of_birth : "N/A"}
      </p>
      <p class="flex gap-2 items-center text-gray-500">
        <img
          class="w-6 h-6"
          src="https://img.icons8.com/?size=30&id=64782&format=png"
          alt=""
        />
        Gender: ${gender ? gender : "N/A"}
      </p>
      <p class="flex gap-2 items-center text-gray-500">
        <img
          class="w-6 h-6"
          src="https://img.icons8.com/?size=24&id=85801&format=png"
          alt=""
        />
        Price: ${price ? price : "N/A"} $
      </p>
      <hr/>
      <div class="flex items-center justify-between">
        <button onclick="displayLikedPet('${image}')" class="btn border-2 border-[#0E7A8126] text-[#0E7A81] font-bold text-lg">
          <img
            class="w-6 h-6"
            src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
            alt=""
          /></button
        ><button id="btn-${petId}" onclick="adoptedModal(${petId})" class="btn hover:text-white hover:bg-[#0E7A81] border-2 border-[#0E7A8126] text-[#0E7A81] font-bold text-lg">Adopt</button>
        <button onclick="petDetails(${petId})" class="btn hover:text-white hover:bg-[#0E7A81] border-2 border-[#0E7A8126] text-[#0E7A81] font-bold text-lg">Details</button>
      </div>
    </div>`;
    petsContainer.appendChild(pets);
  });
};
// Remove Active class
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let button of buttons) {
    button.classList.remove("active");
  }
};

//Button clicked to loadCategory
const loadCategory = async (categoryName) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await res.json();
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("display-pets").classList.add("hidden");
  document.getElementById("liked").classList.add("hidden");
  removeActiveClass();
  sortByPrice(data.data);
  const activeBtn = document.getElementById(`btn-${categoryName}`);
  activeBtn.classList.add("active");
  setTimeout(function () {
    displayAllPets(data.data);
  }, 2000);
};
// pets details
const petDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  displayPetDetails(data.petData);
};
//liked pet
const displayLikedPet = (uri) => {
  const likedPetContainer = document.getElementById("liked-pets");
  const liked = document.createElement("div");
  liked.innerHTML = `      <div class="col-span-1 rounded-lg">
        <img
          class="rounded-lg w-full lg:h-[124px] object-cover"
          src=${uri}
        />
      </div>
   `;
  likedPetContainer.appendChild(liked);
};
const displayPetDetails = (id) => {
  const {
    image,
    pet_name,
    breed,
    date_of_birth,
    gender,
    price,
    vaccinated_status,
    pet_details,
  } = id;
  const modalContainer = document.getElementById("modal-content");
  modalContainer.innerHTML = "";
  const modal = document.createElement("div");
  modal.innerHTML = `<div class="flex flex-col gap-6"><img class="rounded-lg w-full h-[320px] object-cover" src=${image} />
        <h2 class="font-bold text-2xl">${pet_name}</h2>
      <div class="grid md:grid-cols-2 gap-2">
      <p class="flex gap-2 items-center text-gray-500">
        <img
          class="w-6 h-6"
          src="https://cdn-icons-png.flaticon.com/128/5997/5997060.png"
          alt=""
        />Breed: ${breed ? breed : "N/A"}
      </p>
      <p class="flex gap-2 items-center text-gray-500">
        <img
          class="w-6 h-6"
          src="https://img.icons8.com/?size=24&id=117765&format=png"
          alt=""
        />Birth: ${date_of_birth ? date_of_birth : "N/A"}
      </p>
      <p class="flex gap-2 items-center text-gray-500">
        <img
          class="w-6 h-6"
          src="https://img.icons8.com/?size=30&id=64782&format=png"
          alt=""
        />
        Gender: ${gender ? gender : "N/A"}
      </p>

      <p class="flex gap-2 items-center text-gray-500">
        <img
          class="w-6 h-6"
          src="https://img.icons8.com/?size=24&id=85801&format=png"
          alt=""
        />
        Price: ${price ? price : "N/A"} $
      </p>
            <p class="flex gap-2 items-center text-gray-500">
        <img
          class="w-6 h-6"
          src="https://img.icons8.com/?size=30&id=64782&format=png"
          alt=""
        />
        Vaccinated Status: ${vaccinated_status ? vaccinated_status : "N/A"}
      </p></div>
      <div>
      <h2 class="font-semibold text-base">Details Information</h2>
      <p class="text-gray-500">${pet_details}</p>
      </div>
  </div>
  `;
  const modalDiv = document.getElementById("customModal");
  modalContainer.append(modal);
  modalDiv.showModal();
};
///sort by value
const sortByPrice = (pets) => {
  document.getElementById("sort-price").addEventListener("click", () => {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("display-pets").classList.add("hidden");
    document.getElementById("liked").classList.add("hidden");

    setTimeout(() => {
      let sortedPets = pets.sort((a, b) => b.price - a.price);
      displayAllPets(sortedPets);
    }, 2000);
  });
};
//Adopted Modal
const adoptedModal = (id) => {
  console.log(id);
  const disableButton = document.getElementById(`btn-${id}`);
  const adoptModalContainer = document.getElementById("adaptModal-content");
  const modalDiv = document.getElementById("adoptModal");
  disableButton.disabled = true;
  disableButton.innerHTML = "Adopted";
  adoptModalContainer.innerHTML = "";
  const modal = document.createElement("div");
  modal.innerHTML = `
    <div class="flex flex-col gap-3 justify-center items-center"> 
      <img class="w-10 h-10" src="https://img.icons8.com/?size=48&id=kRZicCB1E8B8&format=gif"/>
      <h2 class="font-black lg:text-5xl md:text-3xl text-xl">Congratulations!</h2>
      <p class="font-semibold text-center text-xl">Adoption process has started for your pet.</p>
      <p class="font-black  lg:text-3xl md:text-2xl text-xl "><span id="countdown">3</span></p>
    </div>`;

  adoptModalContainer.append(modal);
  modalDiv.showModal();
  let countdown = 3;
  const countElement = document.getElementById("countdown");

  const countInterval = setInterval(() => {
    countElement.innerText = countdown;
    countdown -= 1;
    if (countdown < 0) {
      clearInterval(countInterval);
      modalDiv.close();
    }
  }, 1000);
};

loadData();
loadAllPets();
