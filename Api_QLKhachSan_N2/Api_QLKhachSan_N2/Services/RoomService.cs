using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Services
{
    public class RoomService : IRoomService
    {
        public readonly IRoomRepository _roomRepository;
        public RoomService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }
        public IEnumerable<Room> GetAllRoom(int? PageIndex, int? RowPerPage, string Search)
        {
            return _roomRepository.GetAllRoom(PageIndex, RowPerPage, Search);
        }

        public IEnumerable<Room> GetRoomToOrderRoom()
        {
            return _roomRepository.GetRoomToOrderRoom();
        }

        public Room UpdateRoom(Room room)
        {
            return _roomRepository.UpdateRoom(room);
        }

        public string UpdateRoomStatus()
        {
            return _roomRepository.UpdateRoomStatus();
        }
    }
}
