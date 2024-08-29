export interface User {
  name: string;
  gender: "male" | "female";
  email: string;
  status: "active" | "inactive";
}

export interface UserFormProps {
  onSuccess: () => void;
}
