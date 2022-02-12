import { Dispatch, SetStateAction } from "react";
import { User } from "../context/context.types";

export type MenuProps = {
  menuAnchorEl: HTMLElement | null;
  setMenuAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
};

export type ProfileProps = {
  openProfile: boolean;
  setOpenProfile: Dispatch<SetStateAction<boolean>>;
}

export type ProfileInfoProps = {
  name: string;
  about: string
}

export type ChatInfoProps = {
  openChatInfo: boolean;
  setOpenChatInfo: Dispatch<SetStateAction<boolean>>;
}

export type GroupChatInfoProps = {
  openGroupChatInfo: boolean;
  setOpenGroupChatInfo :Dispatch<SetStateAction<boolean>>
} 

export type ProfileAvatarProps = {
  name: string;
  pic: string;
  fromGroup: boolean
}

export type HeaderProps = {
  isTyping: boolean;
  name: string | undefined;
  pic: string | undefined;
}

export type MessageType = {
  _id: string;
  text: string;
  sender: User;
  chat: {
    _id: string;
    users: string[]
  }
}

export type MessageBoxProps = {
  text: string;
  sender: User;
  index: number
}

export type AddChatProps = {
  openAddChatModal: boolean;
  setAddChatOpenModal: Dispatch<SetStateAction<boolean>>;
};

export type CreateGroupProps = {
  openGroupModal: boolean;
  setOpenGroupModal: Dispatch<SetStateAction<boolean>>;
};

export type DeleteChatModalProps = {
  openDeleteModal: boolean;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
};

export type LeaveGroupModalProps = {
  openLeaveModal: boolean;
  setOpenLeaveModal: Dispatch<SetStateAction<boolean>>
}