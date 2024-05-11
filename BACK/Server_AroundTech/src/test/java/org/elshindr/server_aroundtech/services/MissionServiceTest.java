package org.elshindr.server_aroundtech.services;

import org.elshindr.server_aroundtech.dtos.MissionDto;
import org.elshindr.server_aroundtech.models.Mission;
import org.elshindr.server_aroundtech.repositories.MissionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class MissionServiceTest {

    @Autowired
    MissionService missionService;

    @Autowired
    MissionRepository missionRepository;

    @Autowired
    ExpenseService expenseService;

    @Test
    void getAllByUser() {

        List<MissionDto> lstMissionsDto = missionService.getAllByUser(0);
        List<Mission> lstMissionsRepoAll = missionRepository.findAll();
        List<Mission> lstMissionsRepoByUser = missionRepository.findMissionByUser(0);


        assertEquals(3, lstMissionsDto.size());
        assertEquals(3, lstMissionsRepoAll.stream().filter(mis -> mis.getUser().getId() == 0).toList().size());
        assertEquals(3, lstMissionsRepoByUser.size());

        for(Mission mis : lstMissionsRepoAll.stream().filter(mis -> mis.getUser().getId() == 0).toList()){
            assertEquals(mis.getUser().getId(), 0);
            assertEquals(lstMissionsDto.stream().filter(misDto -> Objects.equals(misDto.getId(), mis.getId())).findFirst().get().getUserId(), 0);
            assertEquals(lstMissionsRepoByUser.stream().filter(misRepo -> Objects.equals(misRepo.getId(), mis.getId())).findFirst().get().getUser().getId(), 0);
        }
    }

    @Test
    void getOneMissionByUserAndId() {

        List<Mission> lstMissionsRepoAll = missionRepository.findAll();
        List<MissionDto> lstMissionsDto = missionService.getAllByUser(0);
        List<Mission> lstMissionsRepoByUser = missionRepository.findMissionByUser(0);

        // Tests by All missions in Repo
        for(Mission misRepoAll : lstMissionsRepoAll.stream().filter(missionAll -> missionAll.getUser().getId() == 0).toList()){

            MissionDto missionDtoRepoByUserAndId = missionService.getOneMissionByUserAndId(0, misRepoAll.getId());

            assertEquals(missionDtoRepoByUserAndId, new MissionDto(misRepoAll, MissionDto.calculateTotalExpenses(misRepoAll, expenseService.getLstExpensesByUserAndMission(0, misRepoAll.getId()) )));
            assertTrue(missionDtoRepoByUserAndId.equals(missionDtoRepoByUserAndId)); // Test override
        }


        // Tests by all missionDtos create by function getOneMissionByUserAndId()
        for (MissionDto missionDto : lstMissionsDto) {

            MissionDto missionDtoRepoByUserAndId = missionService.getOneMissionByUserAndId(0, missionDto.getId());

            //assertEquals(missionDtoRepoByUserAndId, new MissionDto(missionDto, MissionDto.calculateTotalExpenses(missionDto, expenseService.getLstExpensesByUserAndMission(0, missionDto.getId()) )));
            assertTrue(missionDtoRepoByUserAndId.equals(missionDto));// test override
            assertEquals(missionDto, missionDtoRepoByUserAndId);
        }


        // Tests by all mission in Repo by function findMissionByUser()
        for(Mission misRepoByUser : lstMissionsRepoByUser){

            MissionDto missionDtoRepoByUserAndId = missionService.getOneMissionByUserAndId(0, misRepoByUser.getId());

            assertEquals(missionDtoRepoByUserAndId, new MissionDto(misRepoByUser, MissionDto.calculateTotalExpenses(misRepoByUser, expenseService.getLstExpensesByUserAndMission(0, misRepoByUser.getId()) )));
            assertTrue(missionDtoRepoByUserAndId.equals(missionDtoRepoByUserAndId)); /// test override
        }


    }

    @Test
    void getLstMissionsInWaitByManager() {

        
    }
}