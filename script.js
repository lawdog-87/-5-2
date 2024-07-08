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
            </div>`;
        groupDiv.appendChild(groupTitle);
        
        const coursesDiv = document.createElement('div');
        coursesDiv.className = 'courses';

        const clearButton = document.createElement('button');
        clearButton.className = 'clear-button';
        clearButton.textContent = '清除';
        clearButton.onclick = () => clearSelections(groupIndex);
        coursesDiv.appendChild(clearButton);

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
