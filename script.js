const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
	body.classList.add(bodyClass)
	btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

	addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)

// Fetch the JSON data
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// Populate projects
		const projectsContainer = document.querySelector('.projects__grid');
		data.projects.forEach(project => {
			const projectElement = document.createElement('div');
			projectElement.classList.add('project');

			const titleElement = document.createElement('h3');
			titleElement.textContent = project.title;

			const descriptionElement = document.createElement('p');
			descriptionElement.classList.add("project__description")
			descriptionElement.textContent = project.description;

			const stackElement = document.createElement('ul');
			stackElement.classList.add('project__stack');
			project.stack.forEach(skill => {
				const stackItem = document.createElement('li');
				stackItem.classList.add('project__stack-item');
				stackItem.textContent = skill;
				stackElement.appendChild(stackItem);
			});

			const linkElement = document.createElement('a');
			linkElement.classList.add('link', 'link--icon');
			linkElement.href = project.link;
			linkElement.target = '_blank';
			linkElement.rel = 'noopener noreferrer';
			linkElement.innerHTML = '<i class="fas fa-external-link-alt"></i>';

			projectElement.appendChild(titleElement);
			projectElement.appendChild(descriptionElement);
			projectElement.appendChild(stackElement);
			projectElement.appendChild(linkElement);

			projectsContainer.appendChild(projectElement);
		});

		// Populate skills
		const skillsContainer = document.querySelector('.section-skills');
		const skillsElement = document.createElement("h2");
		skillsElement.classList.add("section__title");
		skillsElement.textContent = "Skills";
		skillsContainer.appendChild(skillsElement);

		const skillsList = document.createElement("ul");
		skillsList.classList.add("skills__list");
		data.skills.forEach(skill => {
			const skillItem = document.createElement('li');
			skillItem.classList.add('skills__list-item');
			skillItem.classList.add('btn');
			skillItem.classList.add('btn--plain');
			skillItem.textContent = skill;
			skillsList.appendChild(skillItem);
		});

		skillsContainer.appendChild(skillsList);

		// Populate work experience
		const workExperienceContainer = document.querySelector('.work-experience');
		const experiencesElement = document.createElement("h2");
		experiencesElement.classList.add("section__title");
		experiencesElement.textContent = "Experiences";
		workExperienceContainer.appendChild(experiencesElement);

		data.workExperience.forEach(work => {
			const workItem = document.createElement('div');
			workItem.classList.add('experience');

			const companyElement = document.createElement('h3');
			companyElement.textContent = work.company;

			const positionElement = document.createElement('h5');
			positionElement.textContent = work.position;

			const durationElement = document.createElement('i');
			durationElement.textContent = work.duration;

			const descriptionElement = document.createElement('li');
			descriptionElement.textContent = work.description;

			workItem.appendChild(companyElement);
			workItem.appendChild(positionElement);
			workItem.appendChild(durationElement);
			workItem.appendChild(descriptionElement);

			workExperienceContainer.appendChild(workItem);
		});
	}
	)

