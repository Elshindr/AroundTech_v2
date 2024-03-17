package org.elshindr.server_aroundtech.dtos;

import org.elshindr.server_aroundtech.models.Role;

import java.util.List;

public class ManagerDto {


    private Integer id;
    private Role role;
    private UserDto userDto;
    private List<Integer> lstIdUserManager;

    public ManagerDto(Integer id, Role role, UserDto userDto, List<Integer> lstIdUserManager) {
        this.id = id;
        this.role = role;
        this.userDto = userDto;
        this.lstIdUserManager = lstIdUserManager;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public List<Integer> getLstIdUserManager() {
        return lstIdUserManager;
    }

    public void setLstIdUserManager(List<Integer> lstIdUserManager) {
        this.lstIdUserManager = lstIdUserManager;
    }


    @Override
    public String toString() {
        return "ManagerDto{" +
                "id=" + id +
                ", role=" + role +
                ", userDto=" + userDto +
                ", lstIdUserManager=" + lstIdUserManager +
                '}';
    }
}
