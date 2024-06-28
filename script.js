const groups = [
    {
        name: '民事法選修學群', credits: 8, courses: [
            { name: '法學緒論', credits: 2 },
            { name: '民法實例演習', credits: 2 },
            { name: '土地法', credits: 4 },
            { name: '土地登記法', credits: 2 },
            { name: '非訟事件法', credits: 2 },
            { name: '強制執行法', credits: 3 },
            { name: '破產法', credits: 2 },
            { name: '債務清理法規', credits: 2 },
            { name: '民事審判實務', credits: 2 },
            { name: '消費者保護法理論與實務', credits: 2 },
            { name: '企業競爭與消費者保護法', credits: 3 },
            { name: '訴訟實務與模擬法庭（一）', credits: 2 },
            { name: '訴訟實務與模擬法庭（二）', credits: 2 },
            { name: '司法文書與訴訟實務', credits: 2 },
            { name: '民法債編各論實例演習', credits: 1 },
            { name: '海商法', credits: 2 },
            { name: '大陸法制研究-民法總則', credits: 2 },
            { name: '兩岸法制比較研究-合同法', credits: 2 },
            { name: '法院組織法', credits: 2 },
            { name: '兩岸法制比較研究-民法', credits: 2 },
            { name: '債法實例演習', credits: 2 },
            { name: '民法實例演習（一）', credits: 2 },
            { name: '企業採購契約法實務', credits: 2 },
            { name: '勞動基準法', credits: 2 },
            { name: '集體勞動法', credits: 2 },
            { name: '民事法實例演習（一）', credits: 2 },
            { name: '勞基法理論與實務', credits: 2 },
            { name: '民事法案例研究', credits: 1 },
            { name: '消費者保護法', credits: 2 },
            { name: '債法實例演習(二)', credits: 1 },
            { name: '民事訴訟法上訴及特殊程序', credits: 1 },
            { name: '租賃住宅契約：理論與實務', credits: 2 },
            { name: '工程法律實務問題', credits: 2 },
            { name: '司法文書與非訟實務', credits: 2 },
            { name: '財產法實例演習', credits: 2 },
            { name: '繼承法案例實作', credits: 1 },
            { name: '租賃住宅契約及實例演習', credits: 2 },
            { name: '法聯想式案例解析方法與實踐-刑法與民法的對話', credits: 2 }
        ]
    },
    { name: '公法學選修學群', credits: 8, courses: [{ name: '法學緒論', credits: 2 }, { name: '政治學', credits: 2 }, { name: '行政法案例研習', credits: 2 }] },
    { name: '刑事法選修學群', credits: 8, courses: [{ name: '法學緒論', credits: 2 }, { name: '刑事訴訟法案例研究', credits: 2 }, { name: '犯罪學', credits: 2 }] },
    { name: '國際經貿法制選修學群', credits: 8, courses: [{ name: '法學緒論', credits: 2 }, { name: '經濟學', credits: 1 }, { name: '會計學', credits: 2 }] },
    { name: '科技法律選修學群', credits: 8, courses: [{ name: '法學緒論', credits: 2 }, { name: '醫學倫理與法律', credits: 2 }, { name: '資訊法律', credits: 2 }] }
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
        groupTitle.innerHTML = `<div class="group-info"><span>${group.name}</span><span class="group-credits">(0/${group.credits} 學分)<button class="toggle-button" onclick="toggleCourses(${groupIndex})">+</button><button class="clear-button" onclick="clearGroup(${groupIndex})">清除</button></span></div>`;
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
        groupCreditsSpan.textContent = `(${groupCredits}/${group.credits} 學分)`;
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

function clearGroup(groupIndex) {
    const group = groups[groupIndex];
    group.courses.forEach((course, courseIndex) => {
        const checkbox = document.getElementById(`group${groupIndex}course${courseIndex}`);
        checkbox.checked = false;
    });
    updateSummary();
}
