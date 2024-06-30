const groups = [
    // Group data with credits as needed
];

const minimumCredits = 8;

document.addEventListener('DOMContentLoaded', () => {
    displayGroups();
    updateSummary();
});

function displayGroups() {
    const groupsContainer = document.getElementById('groups');
    groupsContainer.innerHTML = '';
    groups.forEach((group, groupIndex) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';
        const groupTitle = document.createElement('h3');
        groupTitle.innerHTML = `
            <div class="group-info">
                <span>${group.name}</span>
                <span class="group-credits">(0/${minimumCredits} 學分)</span>
                <button class="toggle-button" onclick="toggleCourses(${groupIndex})">+</button>
                <button class="clear-button" onclick="clearSelections(${groupIndex})">清除</button>
            </div>`;
        groupDiv.appendChild(groupTitle);
        const coursesDiv = document.createElement('div');
        coursesDiv.className = 'courses';
        group.courses.forEach((course, courseIndex) => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course';
            const label = document.createElement('label');
            label.htmlFor = `group${groupIndex}course${courseIndex}`;
            label.textContent = `${course.name} (${course.credits} 學分)`;
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `group${groupIndex}course${courseIndex}`;
            checkbox.dataset.groupIndex = groupIndex;
            checkbox.dataset.courseIndex = courseIndex;
            checkbox.addEventListener('change', updateSummary);
            courseDiv.appendChild(label);
            courseDiv.appendChild(checkbox);
            coursesDiv.appendChild(courseDiv);
        });
        groupDiv.appendChild(coursesDiv);
        groupsContainer.appendChild(groupDiv);
    });
}

function updateSummary() {
    let totalCredits = 0;
    let qualifiedGroups = 0;
    groups.forEach((group, groupIndex) => {
        let groupCredits = 0;
        group.courses.forEach((course, courseIndex) => {
            const checkbox = document.getElementById(`group${groupIndex}course${courseIndex}`);
            if (checkbox.checked) {
                groupCredits += course.credits;
            }
        });
        totalCredits += groupCredits;
        if (groupCredits >= minimumCredits) {
            qualifiedGroups++;
        }
        const groupCreditsSpan = document.querySelector(`.group:nth-child(${groupIndex + 1}) .group-credits`);
        groupCreditsSpan.textContent = `(${groupCredits}/${minimumCredits} 學分)`;
    });
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('qualifiedGroups').textContent = qualifiedGroups;
}

function toggleCourses(groupIndex) {
    const groupDiv = document.querySelector(`.group:nth-child(${groupIndex + 1})`);
    const coursesDiv = groupDiv.querySelector('.courses');
    const toggleButton = groupDiv.querySelector('.toggle-button');
    if (coursesDiv.style.display === 'none' || coursesDiv.style.display === '') {
        coursesDiv.style.display = 'block';
        toggleButton.textContent = '-';
    } else {
        coursesDiv.style.display = 'none';
        toggleButton.textContent = '+';
    }
}

function clearSelections(groupIndex) {
    groups[groupIndex].courses.forEach((_, courseIndex) => {
        const checkbox = document.getElementById(`group${groupIndex}course${courseIndex}`);
        checkbox.checked = false;
    });
    updateSummary();
}
