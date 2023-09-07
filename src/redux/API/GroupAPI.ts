import axios from "axios";
import {
  createGroupApiPath,
  getEmployeesCountGroupApiPath,
  getGroupApiPath,
  getSingleGroupApiPath,
  updateGroupApiPath,
  deleteGroupApiPath
} from "../../APIRoutes";

// CREATE
export const createGroup = async (addGroupData: any) => {
  try {
    const { data } = await axios.post(
      `${createGroupApiPath}`,
      addGroupData,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    return err.response.data
  }
};

// READ
export const getAllGroups = async () => {
  try {
    const { data } = await axios.get(`${getGroupApiPath}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
export const getSingleGroup = async (groupId: any) => {
  try {
    console.log("id", groupId.groupId);
    const { data } = await axios.get(
      `${getSingleGroupApiPath}/${groupId.groupId}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updateGroup = async (groupData: any) => {
  try {
    console.log("groupData", groupData);
    const { data } = await axios.patch(`${updateGroupApiPath}/${groupData.groupId}`, groupData.data,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
export const getAllGroupsCountEmployee = async () => {
  try {
    const { data } = await axios.get(`${getEmployeesCountGroupApiPath}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }

};
//delete
export const deleteGroup = async (groupName: any) => {
  try {
    console.log("grrrroppppon deletegrop", groupName);
    const { data } = await axios.delete(`${deleteGroupApiPath}`, {
      data: { groupName },
      withCredentials: true
    }
    );
    return data;

  }
  catch (err: any) {
    console.log(err.response.data);

  }
}