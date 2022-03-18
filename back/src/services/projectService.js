import { Project } from '../db';
import { v4 as uuidv4 } from 'uuid';

class projectAuthService {
  static async addProject({ userId, title, description, fromDate, toDate }) {
    // id는 유니크 값 부여
    const id = uuidv4();
    const newProject = { id, userId, title, description, fromDate, toDate };

    //db에 저장
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;

    return createdNewProject;
  }
  static async getprojectInfo({ id }) {
    const project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        '올바른 자격증id를 입력해 주세요. 자격증 내역이 없습니다.';
      return { errorMessage };
    }

    return project;
  }
  static async getProjects({ userId }) {
    const projects = await Project.findAll({ userId });

    if (!projects) {
      const errorMessage =
        '해당 작성자의 자격증 내역이 없습니다. 다시 한번 확인해 주세요.';
    }
    return projects;
  }
  static async setProject({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        '올바른 자격증 id를 입력해 주세요. 자격증 내역이 없습니다.';
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = 'title';
      const newValue = toUpdate.title;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.fromDate) {
      const fieldToUpdate = 'fromDate';
      const newValue = toUpdate.fromDate;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.toDate) {
      const fieldToUpdate = 'toDate';
      const newValue = toUpdate.toDate;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    return project;
  }

  static async deletePoject({ id }) {
    const isDataDeleted = await Project.deleteById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        '해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return { status: 'ok' };
  }
}

export { projectAuthService };
