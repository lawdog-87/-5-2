const groups = [
    { name: '民事法選修學群', courses: [{ name: '課程1', credits: 3 }, { name: '課程2', credits: 2 }] },
    { name: '公法學選修學群', courses: [{ name: '課程3', credits: 4 }, { name: '課程4', credits: 1 }] },
    { name: '刑事法選修學群', courses: [{ name: '課程5', credits: 3 }, { name: '課程6', credits: 2 }] },
    { name: '國際經貿法制選修學群', courses: [{ name: '課程7', credits: 3 }, { name: '課程8', credits: 1 }] },
    { name: '科技法律選修學群', courses: [{ name: '課程9', credits: 2 }, { name: '課程10', credits: 3 }] }
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
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `group${groupIndex}course${courseIndex}`;
            checkbox.dataset.groupIndex = groupIndex;
            checkbox.dataset.courseIndex = courseIndex;
            checkbox.addEventListener('change', updateSummary);
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = `${course.name} (${course.credits} 學分)`;
            courseDiv.appendChild(checkbox);
            courseDiv.appendChild(label);
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
