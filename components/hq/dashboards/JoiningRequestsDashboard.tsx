"use client"
import { useEffect, useState } from "react";

const internshipApplications = [
    {
        id: 1,
        name: "Rahul Kumar",
        currentLocation: "Delhi, India",
        cv: "https://example.com/cv.pdf",
        role: "Content Writer",
        video: "https://example.com/video.mp4",
        workMode: "WFH",
    },
    {
        id: 2,
        name: "Sahil Jain",
        currentLocation: "Mumbai, India",
        cv: "https://example.com/cv.pdf",
        role: "Software Engineer",
        video: "https://example.com/video.mp4",
        workMode: "Office",
    },
    {
        id: 3,
        name: "Rohit Mishra",
        currentLocation: "Bangalore, India",
        cv: "https://example.com/cv.pdf",
        role: "Software Engineer",
        video: "https://example.com/video.mp4",
        workMode: "Office",
    },
    {
        id: 4,
        name: "Harsh Jain",
        currentLocation: "Hyderabad, India",
        cv: "https://example.com/cv.pdf",
        role: "Software Engineer",
        video: "https://example.com/video.mp4",
        workMode: "Office",
    },
]

const roles = [
    {
        id: 1,
        name: "Social Media",
    },
    {
        id: 2,
        name: "Content Writer",
    },
    {
        id: 3,
        name: "Graphic Designer",
    },
    {
        id: 4,
        name: "Editor",
    },
    {
        id: 5,
        name: "PR",
    },
    {
        id: 6,
        name: "Business Development",
    },
    {
        id: 7,
        name: "Full Stack Developer - Python",
    },
]

export default function JoiningRequestsDashboard() {
    const [filteredInternshipApplications, setFilteredInternshipApplications] = useState(internshipApplications);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    useEffect(() => {
        const filteredApplications = internshipApplications.filter((internshipApplication) => {
            return (selectedLocation === "" || internshipApplication.currentLocation === selectedLocation) &&
                (selectedRole === "" || internshipApplication.role === selectedRole);
        });
        setFilteredInternshipApplications(filteredApplications);
    }, [selectedLocation, selectedRole, internshipApplications]);

    return (
        <div className="p-8 relative">
            <header className="">
                <h3 className="text-xl font-black tracking-tighter text-white">
                    Applications
                </h3>
                <div className="mt-10">
                    <div className="space-y-2">
                        <div className="flex flex-row items-center justify-end space-x-4">
                            <select
                                className="bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-white"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="">All Locations</option>
                                {internshipApplications.map((internshipApplication) => (
                                    <option key={internshipApplication.id} value={internshipApplication.currentLocation}>
                                        {internshipApplication.currentLocation}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-white"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="">All Roles</option>
                                {internshipApplications.map((internshipApplication) => (
                                    <option key={internshipApplication.id} value={internshipApplication.role}>
                                        {internshipApplication.role}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </header>
            <div className="mt-10">
                <div className="space-y-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-sm text-zinc-500  font-bold border-b border-zinc-800">
                                <tr >
                                    <th className="pb-2 w-1/3 pl-2">Name / Location</th>
                                    <th className="pb-2 w-1/18 text-right">Role</th>
                                    <th className="pb-2 w-1/18 text-right">CV</th>
                                    <th className="pb-2 w-1/18 text-right">Video</th>
                                    <th className="pb-2 w-1/18 text-right pr-2">Location</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-zinc-900">
                                {filteredInternshipApplications.map((internshipApplication) => (
                                    <tr key={internshipApplication.id} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="py-3 pl-2 text-cyan-400">{internshipApplication.name + " / " + internshipApplication.currentLocation}</td>
                                        <td className="py-3 text-right">{internshipApplication.role}</td>
                                        <td className="py-3 text-right"><a href={internshipApplication.cv} target="_blank" rel="noopener noreferrer">View</a></td>
                                        <td className="py-3 text-right"><a href={internshipApplication.video} target="_blank" rel="noopener noreferrer">View</a></td>
                                        <td className="py-3 text-right pr-2">{internshipApplication.workMode}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
