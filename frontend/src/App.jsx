import { useState, useEffect } from "react";
import axios from "axios";

function App() {

    const [students, setStudents] = useState([]);

    const [form, setForm] = useState({
        name: "",
        rollNumber: "",
        email: "",
        department: "",
        semester: ""
    });

    const [editId, setEditId] = useState(null);

    // Get students
    const getStudents = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/students"
            );

            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Add or Update student
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {

                await axios.put(
                    `http://localhost:5000/api/students/${editId}`,
                    form
                );

                alert("Student updated successfully");

                setEditId(null);

            } else {

                await axios.post(
                    "http://localhost:5000/api/students",
                    form
                );

                alert("Student added successfully");
            }

            setForm({
                name: "",
                rollNumber: "",
                email: "",
                department: "",
                semester: ""
            });

            getStudents();

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    // Delete student
    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://localhost:5000/api/students/${id}`
            );

            alert("Student deleted successfully");

            getStudents();

        } catch (error) {
            console.log(error);
        }
    };

    // Edit student
    const editStudent = (student) => {

        setForm({
            name: student.name,
            rollNumber: student.rollNumber,
            email: student.email,
            department: student.department,
            semester: student.semester
        });

        setEditId(student._id);
    };

    // Cancel edit
    const cancelEdit = () => {

        setEditId(null);

        setForm({
            name: "",
            rollNumber: "",
            email: "",
            department: "",
            semester: ""
        });
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Header */}
            <header className="bg-blue-600 text-white shadow-lg">
                <div className="max-w-6xl mx-auto px-6 py-5">

                    <h1 className="text-3xl font-bold">
                        Student Information System
                    </h1>

                    <p className="text-blue-100 mt-1">
                        Manage your students easily
                    </p>

                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8">

                {/* Form */}

                <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                    <h2 className="text-xl font-semibold text-gray-800 mb-5">
                        {editId ? "Edit Student" : "Add New Student"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        <input
                            type="text"
                            placeholder="Student Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value
                                })
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Roll Number"
                            value={form.rollNumber}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    rollNumber: e.target.value
                                })
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Department"
                            value={form.department}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    department: e.target.value
                                })
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="number"
                            placeholder="Semester"
                            value={form.semester}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    semester: e.target.value
                                })
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="flex gap-3 items-center">

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
                            >
                                {editId
                                    ? "Update Student"
                                    : "Add Student"}
                            </button>

                            {editId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                </div>

                {/* Students */}

                <div className="bg-white rounded-xl shadow-md overflow-hidden">

                    <div className="px-6 py-5 border-b">

                        <h2 className="text-xl font-semibold text-gray-800">
                            Students
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Total students: {students.length}
                        </p>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Name
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Roll Number
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Email
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Department
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Semester
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {students.map((student) => (

                                    <tr
                                        key={student._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {student.name}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {student.rollNumber}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {student.email}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {student.department}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {student.semester}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        editStudent(student)
                                                    }
                                                    className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-2 rounded-lg text-sm font-medium transition"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteStudent(student._id)
                                                    }
                                                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded-lg text-sm font-medium transition"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    {students.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No students found.
                        </div>
                    )}

                </div>

            </main>

        </div>
    );
}

export default App;