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
    });
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('qualifiedGroups').textContent = qualifiedGroups;
}

function addGroup() {
    const newGroupName = document.getElementById('newGroupName').value;
    if (newGroupName.trim() !== '') {
        groups.push({ name: newGroupName, courses: [] });
        displayGroups();
    }
    document.getElementById('newGroupName').value = '';
}
