"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  Search,
  Download,
  Cloud,
  CheckCircle2,
  X,
  Check
} from "lucide-react";

interface StorageFile {
  id: string;
  name: string;
  category: "Design Assets" | "API Specs" | "Project Documentation" | "Deliverables";
  format: "PDF" | "PNG" | "TSX" | "JSON" | "ZIP";
  size: string;
  uploadedBy: string;
  uploadedDate: string;
}

export default function FilesPage() {
  const [files, setFiles] = useState<StorageFile[]>([
    {
      id: "f-1",
      name: "Codentraa_Complete_Master_Documentation.pdf",
      category: "Project Documentation",
      format: "PDF",
      size: "2.04 MB",
      uploadedBy: "Atif Mughal",
      uploadedDate: "2026-08-14",
    },
    {
      id: "f-2",
      name: "Codentraa_Business_Proposal_and_Developer_Blueprint.pdf",
      category: "Deliverables",
      format: "PDF",
      size: "743 KB",
      uploadedBy: "Sarah Khan",
      uploadedDate: "2026-08-13",
    },
    {
      id: "f-3",
      name: "Acme_SaaS_Architecture_Diagram.png",
      category: "Design Assets",
      format: "PNG",
      size: "269 KB",
      uploadedBy: "Ali Ahmed",
      uploadedDate: "2026-08-12",
    },
    {
      id: "f-4",
      name: "TenantDbContextInterceptor_Specs.tsx",
      category: "API Specs",
      format: "TSX",
      size: "42 KB",
      uploadedBy: "Atif Mughal",
      uploadedDate: "2026-08-11",
    },
    {
      id: "f-5",
      name: "SignalR_WebSockets_Contract_Schema.json",
      category: "API Specs",
      format: "JSON",
      size: "18 KB",
      uploadedBy: "Fatima Noor",
      uploadedDate: "2026-08-10",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;

    const newFile: StorageFile = {
      id: `f-${Date.now()}`,
      name: fileName,
      category: "Project Documentation",
      format: "PDF",
      size: "1.2 MB",
      uploadedBy: "Atif Mughal",
      uploadedDate: new Date().toISOString().split("T")[0],
    };

    setFiles([newFile, ...files]);
    setFileName("");
    setShowModal(false);
    showNotification(`File "${newFile.name}" uploaded to AWS S3.`);
  };

  const handleDownloadFile = (file: StorageFile) => {
    const content = `Codentraa Storage Asset: ${file.name}\nCategory: ${file.category}\nFormat: ${file.format}\nUploaded By: ${file.uploadedBy}\nDate: ${file.uploadedDate}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification(`Downloaded ${file.name} via AWS S3 pre-signed URL.`);
  };

  const filteredFiles = files.filter((f) => {
    const matchesCategory = filterCategory === "All" || f.category === filterCategory;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getFormatBadge = (fmt: StorageFile["format"]) => {
    switch (fmt) {
      case "PDF":
        return "bg-[#FEE2E2] text-[#EF4444] border-red-200";
      case "PNG":
        return "bg-[#EEF2FF] text-[#4F46E5] border-indigo-200";
      case "TSX":
        return "bg-[#EFF6FF] text-[#3B82F6] border-blue-200";
      case "JSON":
        return "bg-[#FEF3C7] text-[#D97706] border-amber-200";
      default:
        return "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]";
    }
  };

  return (
    <div className="space-y-8 font-sans pb-12 text-[#0F172A] bg-[#F8FAFC]">
      {/* Toast Notification Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-[#047857] text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              Cloud Storage & AWS S3
            </span>
            <span className="text-[#64748B] text-xs font-medium">• Pre-Signed Uploads</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1 flex items-center gap-2">
            Files & Document Repository <FileText className="w-6 h-6 text-[#4F46E5]" />
          </h1>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            Store, download, and manage client deliverables, architecture specs, and asset files.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* 4 Storage Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EEF2FF] text-[#4F46E5] rounded-xl">
              <Cloud className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Storage Used</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">24.8 GB</div>
          <p className="text-[11px] text-[#4F46E5] font-bold">Of 100 GB enterprise S3</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#ECFDF5] text-[#10B981] rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Total Documents</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">142</div>
          <p className="text-[11px] text-[#10B981] font-bold">Encrypted & backed up</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#EFF6FF] text-[#3B82F6] rounded-xl">
              <Download className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Downloads Q3</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">328</div>
          <p className="text-[11px] text-[#3B82F6] font-bold">Pre-signed URL requests</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center text-[#64748B] mb-2">
            <div className="p-2.5 bg-[#FEF3C7] text-[#D97706] rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#64748B]">Active Buckets</span>
          </div>
          <div className="text-3xl font-extrabold text-[#0F172A] my-1">3</div>
          <p className="text-[11px] text-[#D97706] font-bold">AWS US-East-1 & EU-West</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
          {["All", "Project Documentation", "Design Assets", "API Specs", "Deliverables"].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterCategory === c
                  ? "bg-[#4F46E5] text-white shadow-sm font-extrabold"
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative flex-1 md:w-64">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document name..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Files Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] uppercase tracking-wider font-extrabold border-b border-[#E2E8F0]">
              <tr>
                <th className="p-4 pl-6">Format</th>
                <th className="p-4">File Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Size</th>
                <th className="p-4">Uploaded By</th>
                <th className="p-4">Upload Date</th>
                <th className="p-4 pr-6 text-right">AWS Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A] font-medium">
              {filteredFiles.map((f) => (
                <tr key={f.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="p-4 pl-6">
                    <span
                      className={`text-[9px] font-extrabold px-2.5 py-1 rounded-lg border uppercase ${getFormatBadge(
                        f.format
                      )}`}
                    >
                      {f.format}
                    </span>
                  </td>

                  <td className="p-4 font-extrabold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors max-w-xs truncate">
                    {f.name}
                  </td>

                  <td className="p-4">
                    <span className="bg-[#EEF2FF] text-[#4F46E5] font-bold px-2.5 py-1 rounded-lg text-[10px] border border-indigo-100">
                      {f.category}
                    </span>
                  </td>

                  <td className="p-4 font-mono text-[#64748B]">{f.size}</td>
                  <td className="p-4 font-bold text-[#0F172A]">{f.uploadedBy}</td>
                  <td className="p-4 font-mono text-[#64748B]">{f.uploadedDate}</td>

                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => handleDownloadFile(f)}
                      className="bg-[#EEF2FF] hover:bg-[#4F46E5] text-[#4F46E5] hover:text-white px-3.5 py-1.5 rounded-lg font-extrabold text-[11px] inline-flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] p-6 md:p-8 rounded-2xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h2 className="text-lg font-extrabold text-[#0F172A]">Upload Asset to AWS S3</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Architecture_Blueprint_v2.pdf"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#4F46E5] transition-all"
                />
              </div>

              <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-6 text-center space-y-2 bg-[#F8FAFC]">
                <Upload className="w-8 h-8 text-[#4F46E5] mx-auto" />
                <p className="text-xs font-bold text-[#0F172A]">Drag & drop files here, or browse</p>
                <p className="text-[10px] text-[#64748B] font-medium">Supports PDF, PNG, TSX, JSON, ZIP up to 50MB</p>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer border border-[#E2E8F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer flex items-center space-x-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Generate Pre-Signed S3 Upload</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
