// fetch('https://randomuser.me/api/?results=48')
//   .then(response => response.json())
//   .then(data => {
//     const people = data.results;
//     const container = document.querySelector('#people-container');

//     people.forEach(person => {
//       const div = document.createElement('div');
//       div.classList.add('person');
//       div.innerHTML = `
//         <img src="${person.picture.large}" alt="${person.name.first} ${person.name.last}">
//         <p>${person.name.first} ${person.name.last}</p>
//         <p>${person.email}</p>
//         <p>${person.phone}</p>
//       `;
//       container.appendChild(div);
//     });
// });


fetch('https://randomuser.me/api/?results=100')
  .then(response => response.json())
  .then(data => {
    let people = data.results;
    const container = document.querySelector('#people-container');
    const genderSelect = document.querySelector('#gender-select');
    const sortSelect = document.querySelector('#sort-select');

    renderPeopleList(people);

    genderSelect.addEventListener('change', handleGenderFilter);
    sortSelect.addEventListener('change', handleSort);

    
    function renderPeopleList(peopleList) {
      container.innerHTML = '';
      peopleList.forEach(person => {
        const div = document.createElement('div');
        div.classList.add('person');
        div.innerHTML = `
          <img src="${person.picture.large}" alt="${person.name.first} ${person.name.last}">
          <p>${person.name.first} ${person.name.last}</p>
          <p>${person.email}</p>
          <p>${person.phone}</p>
        `;
        container.appendChild(div);
      });
    }

    
    function handleGenderFilter() {
      const selectedGender = genderSelect.value;
      if (selectedGender === '') {
        renderPeopleList(people);
      } else {
        const filteredList = people.filter(person => person.gender === selectedGender);
        renderPeopleList(filteredList);
      }
    }

    function handleSort() {
      const selectedSort = sortSelect.value;
      if (selectedSort === 'default') {
        renderPeopleList(people);
      } else if (selectedSort === 'age-asc') {
        const sortedList = people.sort((a, b) => new Date(a.dob.date) - new Date(b.dob.date));
        renderPeopleList(sortedList);
      } else if (selectedSort === 'age-desc') {
        const sortedList = people.sort((a, b) => new Date(b.dob.date) - new Date(a.dob.date));
        renderPeopleList(sortedList);
      }
    }
});


