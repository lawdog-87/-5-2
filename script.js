const groups = [
    { name: '民事法選修學群', courses: [{ name: '民法概論', credits: 3 }, { name: '契約法', credits: 2 }] },
    { name: '刑事法選修學群', courses: [{ name: '刑法概論', credits: 4 }, { name: '刑事訴訟法', credits: 1 }] },
    { name: '商事法選修學群', courses: [{ name: '公司法', credits: 3 }, { name: '商法', credits: 2 }] },
    { name: '國際法選修學群', courses: [{ name: '國際法', credits: 3 }, { name: '國際貿易法', credits: 1 }] },
    { name: '勞動法選修學群', courses: [{ name: '勞動法', credits: 2 }, { name: '勞動訴訟法', credits: 3 }] }
];

const minimumCredits = 5;

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
        groupTitle.textContent = group.name;
        groupDiv.appendChild(groupTitle);

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
            groupDiv.appendChild(courseDiv);
        });

        const addCourseDiv = document.createElement('div');
        addCourseDiv.className = 'add-course';
        const courseNameInput = document.createElement('input');
        courseNameInput.type = 'text';
        courseNameInput.placeholder = '課程名稱';
        courseNameInput.id = `newCourseName${groupIndex}`;
        const courseCreditsInput = document.createElement('input');
        courseCreditsInput.type = 'number';
        courseCreditsInput.placeholder = '學分';
        courseCreditsInput.id = `newCourseCredits${groupIndex}`;
        const addCourseButton = document.createElement('button');
        addCourseButton.textContent = '添加課程';
        addCourseButton.onclick = () => addCourse(groupIndex);
        addCourseDiv.appendChild(courseNameInput);
        addCourseDiv.appendChild(courseCreditsInput);
        addCourseDiv.appendChild(addCourseButton);
        groupDiv.appendChild(addCourseDiv);

        groupsContainer.appendChild(groupDiv);
