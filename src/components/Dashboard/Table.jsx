import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { AiOutlineDownload } from "react-icons/ai";

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "https://www.riadsaveurs.site/index.php?action=reservation"
        );
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleDownloadPDF = async () => {
    const table = document.getElementById("reservationTable");
    const canvas = await html2canvas(table);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 190; // Adjusted to fit A4 width
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("reservations.pdf");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Reservations</h2>
        {/* Stylish download button */}
        <button
          onClick={handleDownloadPDF}
          className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow transition duration-200"
        >
          <AiOutlineDownload size={20} />
          <span className="font-medium">Download</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table
          id="reservationTable"
          className="min-w-full bg-white border-separate border-spacing-0 table-auto"
        >
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-center">
              <th className="py-2 px-3 border-b text-left">Username</th>
              <th className="py-2 px-3 border-b text-left">Reservation ID</th>
              <th className="py-2 px-3 border-b text-left">Email</th>
              <th className="py-2 px-3 border-b text-left">Location</th>
              <th className="py-2 px-3 border-b text-left">Date</th>
              <th className="py-2 px-3 border-b text-left">Time</th>
              <th className="py-2 px-3 border-b text-left">Table ID</th>
              <th className="py-2 px-3 border-b text-left">Price</th>
              <th className="py-2 px-3 border-b text-left">Status</th>
              <th className="py-2 px-3 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.reservation_id}
                className="text-center hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 px-3 border-b text-gray-600">
                  {reservation.reserved_by}
                </td>
                <td className="py-2 px-3 border-b text-gray-600">
                  {reservation.reservation_id}
                </td>
                <td className="py-2 px-3 border-b text-gray-600">
                  {reservation.email}
                </td>
                <td className="py-2 px-3 border-b text-gray-600">
                  {reservation.location}
                </td>
                <td className="py-2 px-3 border-b text-gray-600">
                  {reservation.reservation_date.split(" ")[0]}
                </td>
                <td className="py-2 px-3 border-b text-gray-600">
                  {reservation.reservation_time}
                </td>
                <td className="py-2 px-3 border-b text-gray-600">
                  {reservation.table_id}
                </td>
                <td className="py-2 px-3 border-b text-gray-600">
                  {reservation.total_price}
                </td>
                <td className="py-2 px-3 border-b text-gray-600">
                  <span
                    className={`py-1 px-2 rounded ${
                      reservation.status === "Pending"
                        ? "bg-yellow-300 text-yellow-800"
                        : reservation.status === "Approved"
                        ? "bg-green-300 text-green-800"
                        : reservation.status === "Rejected"
                        ? "bg-red-300 text-red-800"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>
                <td className="py-4 px-3 border-b flex space-x-2 items-center justify-center">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Approve
                  </button>
                  <button className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600">
                    Reject
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsTable;
