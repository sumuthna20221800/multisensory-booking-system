/*import BookingForm from "../components/booking/BookingForm";

function BookingPage() {
  return (
    <div className="booking-page">
      
      <BookingForm />
    </div>
  );
}

export default BookingPage;
*/
import { useParams } from "react-router-dom";
import BookingForm from "../components/booking/BookingForm";

function BookingPage() {
  const { id } = useParams(); // Grabs "LOD-001" from the URL

  return (
    <div className="booking-page">
      <BookingForm preSelectedId={id} />
    </div>
  );
}

export default BookingPage;