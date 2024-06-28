const groups = [
    { name: '民事法選修學群', courses: [{ name: '法學緒論', credits: 2 }, { name: '民法實例演習', credits: 2 }, { name: '土地法', credits: 4 }] },
    { name: '公法學選修學群', courses: [{ name: '法學緒論', credits: 2 }, { name: '政治學', credits: 2 }, { name: '行政法案例研習', credits: 2 }] },
    { name: '刑事法選修學群', courses: [{ name: '法學緒論', credits: 2 }, { name: '刑事訴訟法案例研究', credits: 2 }, { name: '犯罪學', credits: 2 }] },
    { name: '國際經貿法制選修學群', courses: [{ name: '法學緒論', credits: 2 }, { name: '經濟學', credits: 1 }, { name: '會計學', credits: 2 }] },
    { name: '科技法律選修學群', courses: [{ name: '法學緒論', credits: 2 }, { name: '醫學倫理與法律', credits: 2 }, { name: '資訊法律', credits: 2 }] }
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
