package com.client.controller;

import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.ui.Model;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import org.springframework.web.bind.annotation.ModelAttribute;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.chengxusheji.po.OldLevel;
import com.chengxusheji.service.OldLevelService;
import com.client.service.AuthService;
import com.client.utils.JsonResult;
import com.client.utils.JsonResultBuilder;
import com.client.utils.ReturnCode;

@RestController
@RequestMapping("/api/oldLevel") 
public class ApiOldLevelController {
	@Resource OldLevelService oldLevelService;
	@Resource AuthService authService;

	@InitBinder("oldLevel")
	public void initBinderOldLevel(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("oldLevel.");
	}

	/*客户端ajax方式添加新旧程度信息*/
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public JsonResult add(@Validated OldLevel oldLevel, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors()) //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR);
        oldLevelService.addOldLevel(oldLevel); //添加到数据库
        return JsonResultBuilder.ok();
	}

	/*客户端ajax更新新旧程度信息*/
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public JsonResult update(@Validated OldLevel oldLevel, BindingResult br, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		if (br.hasErrors())  //验证输入参数
			return JsonResultBuilder.error(ReturnCode.INPUT_PARAM_ERROR); 
        oldLevelService.updateOldLevel(oldLevel);  //更新记录到数据库
        return JsonResultBuilder.ok(oldLevelService.getOldLevel(oldLevel.getLevelId()));
	}

	/*ajax方式显示获取新旧程度详细信息*/
	@RequestMapping(value="/get/{levelId}",method=RequestMethod.POST)
	public JsonResult getOldLevel(@PathVariable int levelId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
        /*根据主键levelId获取OldLevel对象*/
        OldLevel oldLevel = oldLevelService.getOldLevel(levelId); 
        return JsonResultBuilder.ok(oldLevel);
	}

	/*ajax方式删除新旧程度记录*/
	@RequestMapping(value="/delete/{levelId}",method=RequestMethod.POST)
	public JsonResult deleteOldLevel(@PathVariable int levelId,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
		//通过accessToken获取到用户信息 
		String userName = authService.getUserName(request);
		if(userName == null) return JsonResultBuilder.error(ReturnCode.TOKEN_VALID_ERROR);
		try {
			oldLevelService.deleteOldLevel(levelId);
			return JsonResultBuilder.ok();
		} catch (Exception ex) {
			return JsonResultBuilder.error(ReturnCode.FOREIGN_KEY_CONSTRAINT_ERROR);
		}
	}

	//客户端查询新旧程度信息
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public JsonResult list(Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		if (page==null || page == 0) page = 1;
		if(rows != 0)oldLevelService.setRows(rows);
		List<OldLevel> oldLevelList = oldLevelService.queryOldLevel(page);
	    /*计算总的页数和总的记录数*/
	    oldLevelService.queryTotalPageAndRecordNumber();
	    /*获取到总的页码数目*/
	    int totalPage = oldLevelService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = oldLevelService.getRecordNumber();
	    HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("totalPage", totalPage);
	    resultMap.put("list", oldLevelList);
	    return JsonResultBuilder.ok(resultMap);
	}

	//客户端ajax获取所有新旧程度
	@RequestMapping(value="/listAll",method=RequestMethod.POST)
	public JsonResult listAll() throws Exception{
		List<OldLevel> oldLevelList = oldLevelService.queryAllOldLevel(); 
		return JsonResultBuilder.ok(oldLevelList);
	}
}

