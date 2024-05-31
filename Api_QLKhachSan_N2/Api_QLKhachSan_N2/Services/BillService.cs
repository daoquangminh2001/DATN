using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Services
{
    public class BillService : IBillService
    {
        IBillRepository _billRepository;
        public BillService(IBillRepository BillRepository)
        {
            _billRepository = BillRepository;
        }

        public IEnumerable<Bill> getAllBill()
        {
            return _billRepository.getAllBill();
        }

        public IEnumerable<CustomerResponse> getBill_Customer(string customerID)
        {
            return _billRepository.getBill_Customer(customerID);
        }

        public IEnumerable<OrderRoomResponse> getBill_OrderRoom(string customerID)
        {
            return _billRepository.getBill_OrderRoom(customerID);
        }

        public IEnumerable<OrderServiceResponse> getBill_OrderService(string customerID)
        {
            return _billRepository.getBill_OrderService(customerID);
        }

        public IEnumerable<Bill> getBill_Payment(string customerID)
        {
            return _billRepository.getBill_Payment(customerID);
        }

        public Bill InsertBill(Bill bill)
        {
            return _billRepository.InsertBill(bill);
        }

        public string UpdateBill(string customerID)
        {
            return _billRepository.UpdateBill(customerID);
        }
        public IEnumerable<Bill> getBillByGuestID(string guestID)
        {
            return _billRepository.getBillByGuestID(guestID);
        }
    }
}
