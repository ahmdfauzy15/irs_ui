import React from 'react';

const RecentReports = ({ reports, searchTerm }) => {
  const filteredReports = reports.filter(report =>
    report.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.sistem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.periode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const styles = {
      berhasil: 'bg-green-100 text-green-800 border-green-200',
      terlambat: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'tidak-berhasil': 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      berhasil: 'Berhasil',
      terlambat: 'Terlambat',
      'tidak-berhasil': 'Tidak Berhasil',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getSystemBadge = (system) => {
    const styles = {
      APOLO: 'bg-blue-100 text-blue-800 border-blue-200',
      'E-REPORTING': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      SIPINA: 'bg-pink-100 text-pink-800 border-pink-200',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[system]}`}>
        {system}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Laporan</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sistem</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Submit</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredReports.map((report) => (
            <tr key={report.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{report.id}</td>
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-gray-900">{report.jenis}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {getSystemBadge(report.sistem)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{report.periode}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{report.tanggal}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                {getStatusBadge(report.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredReports.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Tidak ada laporan yang sesuai dengan pencarian</p>
        </div>
      )}
    </div>
  );
};

export default RecentReports;