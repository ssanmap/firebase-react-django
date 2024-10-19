import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserForm } from '../ui/components/UserForm';
import { UserList } from '../ui/components/UserList';
import { useUserList } from '../ui/hooks/useUserList';
import { LoginForm } from '../ui/components/LoginForm';
export const App = () => {
  const { users } = useUserList();
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/create-user" element={<UserForm onUserCreated={() => {}} />} />
      <Route path="/user-list" element={<UserList  users={users}/>} />
    </Routes>
  </Router>
  );
};
