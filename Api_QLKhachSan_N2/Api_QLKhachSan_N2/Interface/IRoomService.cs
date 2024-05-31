using Api_QLKhachSan_N2.Entities;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Interface
{
    public interface IRoomService
    {
        IEnumerable<Room> GetAllRoom(int? PageIndex, int? RowPerPage, string? Search);
        Room UpdateRoom(Room room);
        string UpdateRoomStatus();
        IEnumerable<Room> GetRoomToOrderRoom();
    }
}
