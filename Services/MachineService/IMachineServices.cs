/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */

using Entities;
using Microsoft.AspNetCore.Mvc;

namespace Viscon_ProjectC_Groep4.Services.MachineService {
    
    public interface IMachineServices
    {
        public Task<List<Machine>> GetAll();
    }
}