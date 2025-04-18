
import { useState } from "react";
import { AddAdminForm } from "./AddAdminForm";
import { AdminUsersList } from "./AdminUsersList";

export const AdminUsers = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdminAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Управление администраторами</h2>
      
      <div className="mb-6">
        <AddAdminForm onAdminAdded={handleAdminAdded} />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Текущие администраторы</h3>
        <AdminUsersList key={refreshKey} />
      </div>
    </div>
  );
};

export default AdminUsers;
