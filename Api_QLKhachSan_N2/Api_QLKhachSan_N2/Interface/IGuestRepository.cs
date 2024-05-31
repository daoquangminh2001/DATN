using Api_QLKhachSan_N2.Entities;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Interface
{
    public interface IGuestRepository
    {
        IEnumerable<Guest> GetFilterGuest(int? pagenumber, int? rowsofpage, string? search, string? sort);
        string? CreateGuest(Guest guest);
        string? UpdateGuest(Guest guest);
        string? DeleteGuest(string? khid);
    }
}
