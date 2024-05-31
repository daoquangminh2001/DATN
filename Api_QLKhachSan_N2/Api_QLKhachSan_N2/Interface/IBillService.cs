using Api_QLKhachSan_N2.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Interface
{
    public interface IBillService
    {
        IEnumerable<Bill> getAllBill();
        Bill InsertBill(Bill bill);
        string UpdateBill(string? customerID);
        IEnumerable<CustomerResponse> getBill_Customer( string? customerID);
        IEnumerable<Bill> getBill_Payment(string? customerID);
        IEnumerable<OrderServiceResponse> getBill_OrderService(string? customerID);
        IEnumerable<OrderRoomResponse> getBill_OrderRoom(string? customerID);
        IEnumerable<Bill> getBillByGuestID(string? guestID);
    }
}
