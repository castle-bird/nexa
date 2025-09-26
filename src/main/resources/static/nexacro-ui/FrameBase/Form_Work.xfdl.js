(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Work");
            this.set_titletext("Form_Work");
            if (Form == this.constructor)
            {
                this._setFormPosition(1440,900);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"title\" type=\"STRING\" size=\"256\"/><Column id=\"content\" type=\"STRING\" size=\"256\"/><Column id=\"author\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"status\" type=\"INT\" size=\"256\"/><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"title\" type=\"STRING\" size=\"256\"/><Column id=\"content\" type=\"STRING\" size=\"256\"/><Column id=\"author\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_status", this);
            obj._setContents("<ColumnInfo><Column id=\"status\" type=\"STRING\" size=\"256\"/><Column id=\"message\" type=\"STRING\" size=\"256\"/><Column id=\"updated\" type=\"STRING\" size=\"256\"/><Column id=\"skipped\" type=\"STRING\" size=\"256\"/><Column id=\"failed\" type=\"STRING\" size=\"256\"/><Column id=\"inserted\" type=\"STRING\" size=\"256\"/><Column id=\"deleted\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Edit("Edit00","-34","-34","140","20",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);

            obj = new Panel("Panel00","0",null,null,"415","0","49",null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_flexcrossaxisalign("center");
            obj.set_flexmainaxisalign("center");
            obj.set_spacing("10");
            obj._setContents("<Contents><PanelItem id=\"PanelItem00\" componentid=\"Div00\"/></Contents>");
            this.addChild(obj.name, obj);

            obj = new Grid("grdList","24","198",null,null,"24","Panel00:30",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("ds_list");
            obj.set_autofittype("col");
            obj.set_nodatatext("조회된 값이 없습니다.");
            obj.set_showselection("true");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\" band=\"left\"/><Column size=\"80\"/><Column size=\"80\" band=\"right\"/></Columns><Rows><Row size=\"62\" band=\"head\"/><Row size=\"48\"/></Rows><Band id=\"head\"><Cell text=\"상태\"/><Cell col=\"1\" text=\"타이틀\"/><Cell col=\"2\" text=\"작성자\"/></Band><Band id=\"body\"><Cell cssclass=\"expr: (status == 0 ? &quot;&quot; :  status == 1 ? &quot;cell_modify&quot; : status == 2 ? &quot;cell_add&quot; : &quot;cell_del&quot;)\" displaytype=\"imagecontrol\"/><Cell col=\"1\" text=\"bind:title\" edittype=\"none\" displaytype=\"normal\"/><Cell col=\"2\" text=\"bind:author\" edittype=\"none\" displaytype=\"normal\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("Button02_00",null,"142","138","48","24",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("행삭제");
            obj.set_cssclass("btn_WF_RowDel");
            this.addChild(obj.name, obj);

            obj = new Button("Button02",null,"142","138","48","Button02_00:10",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("행추가");
            obj.set_cssclass("btn_WF_RowAdd");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","24","142","100","56",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("조회 목록");
            this.addChild(obj.name, obj);

            obj = new Div("divSearch","0","0",null,"125","0",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("Div00");
            obj.set_cssclass("div_WF_Search");
            this.addChild(obj.name, obj);

            obj = new Button("btnSave",null,"49","138","48","172",null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("6");
            obj.set_text("저장");
            this.divSearch.addChild(obj.name, obj);

            obj = new Button("btnSearch",null,"49","138","48","24",null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("0");
            obj.set_text("조회");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static00","24","28","295","21",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("1");
            obj.set_text("제목");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.divSearch.addChild(obj.name, obj);

            obj = new Edit("edtTitle","24","49","295","48",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("2");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("dsad","339","28","295","21",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("3");
            obj.set_text("내용");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.divSearch.addChild(obj.name, obj);

            obj = new Edit("edtContent","339","49","295","48",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("4");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("sd","654","28","295","21",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("5");
            obj.set_text("작성자");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.divSearch.addChild(obj.name, obj);

            obj = new Edit("edtAuthor","654","49","295","48",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("7");
            this.divSearch.addChild(obj.name, obj);

            obj = new Div("Div00","390","583","1074","395",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("Div00");
            obj.set_cssclass("div_WF_View");
            this.addChild(obj.name, obj);

            obj = new Edit("edtTitle2","38","83","295","48",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("0");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00","38","62","295","21",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("1");
            obj.set_text("제목");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("edtContent2","353","83","295","48",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("2");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("dsad00","38","151","610","21",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("3");
            obj.set_text("내용");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sd00","353","62","295","21",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("4");
            obj.set_text("작성자");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00_01","857","141","138","21",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("5");
            obj.set_text("상태");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("dsad00_00","668","141","138","21",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("6");
            obj.set_text("수정 갯수");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sd00_00","857","220","138","21",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("7");
            obj.set_text("실패갯수");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sd00_00_00","668","220","138","21",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("8");
            obj.set_text("추가 갯수");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00_01_00","668","62","138","21",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("9");
            obj.set_text("알림 메시지");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01","857","162","138","48",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("10");
            obj.set_readonly("true");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01_00","668","162","138","48",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("11");
            obj.set_readonly("true");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01_01","857","241","138","48",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("12");
            obj.set_readonly("true");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit02","668","83","327","48",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("13");
            obj.set_readonly("true");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit02_00","668","241","138","48",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("14");
            obj.set_readonly("true");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("sd00_00_00_00","668","299","138","21",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("15");
            obj.set_text("삭제 갯수");
            obj.set_cssclass("sta_WF_SearchTxt");
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit03","668","320","138","48",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("16");
            obj.set_readonly("true");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00_00_00","38","28","100","34",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("17");
            obj.set_text("상세정보");
            this.Div00.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","38","172","610","196",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("18");
            this.Div00.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this.divSearch.form
            obj = new Layout("default","",0,0,this.divSearch.form,function(p){});
            this.divSearch.form.addLayout(obj.name, obj);

            //-- Default Layout : this.Div00.form
            obj = new Layout("default","",0,0,this.Div00.form,function(p){});
            this.Div00.form.addLayout(obj.name, obj);

            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1440,900,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","Div00.form.edtContent2","value","ds_list","author");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","Div00.form.edtTitle2","value","ds_list","title");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","Div00.form.TextArea00","value","ds_list","content");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","Div00.form.Edit01_00","value","ds_status","updated");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","Div00.form.Edit02_00","value","ds_status","inserted");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","Div00.form.Edit03","value","ds_status","deleted");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","Div00.form.Edit01_01","value","ds_status","failed");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","Div00.form.Edit02","value","ds_status","message");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item8","Div00.form.Edit01","value","ds_status","status");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Work.xfdl", function() {
        // 전역변수
        this.isModify = false; // 행추가/삭제 시 true


        this.btnSearch_onclick = function(obj,e) {
        	this.fnSearch();
        };

        this.btnSave_onclick = function(obj,e) {
        	var val = this.valCheck();
        	if(val) {
        		alert("값을 작성해주세요");
        		return;
        	}

        	if(this.isModify) {
        		this.fnSave();
        	}else {
        		this.fnUpdate();
        	}


        };

        // 조회
        this.fnSearch = function () {
            // 조건 셋팅
            this.ds_search.clearData();
        	this.ds_search.addRow();
            this.ds_search.setColumn(0, "title", this.divSearch.form.edtTitle.value);
            this.ds_search.setColumn(0, "content", this.divSearch.form.edtContent.value);
            this.ds_search.setColumn(0, "author", this.divSearch.form.edtAuthor.value);

            var strSvcId    = "search";
            var strSvcUrl   = "svc::api/board/list";
            var inData      = "ds_request=ds_search";
            var outData     = "ds_list=ds_response";
            var strArg      = "";
            var callBackFnc = "fnCallback";
            var isAsync     = true;

            this.transaction(strSvcId, strSvcUrl, inData, outData, strArg, callBackFnc, isAsync);
        };

        // 수정
        this.fnUpdate = function() {
        	var strSvcId    = "update";
        	var strSvcUrl   = "svc::api/board/list/update";
        	var inData      = "ds_request=ds_list:U";
        	var outData     = "ds_status=ds_response";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";
        	var isAsync     = true;

            this.transaction(strSvcId, strSvcUrl, inData, outData, strArg, callBackFnc, isAsync);
        };

        // 저장
        this.fnSave = function() {
        	var strSvcId    = "save";
        	var strSvcUrl   = "svc::api/board/list/update";
        	var inData      = "ds_request=ds_list:U";
        	var outData     = "ds_status=ds_response";
        	var strArg      = "save=true";
        	var callBackFnc = "fnCallback";
        	var isAsync     = true;

            this.transaction(strSvcId, strSvcUrl, inData, outData, strArg, callBackFnc, isAsync);
        };



        this.fnCallback = function(svcID, errorCode, errorMsg)
        {
            if (errorCode != 0) {
                this.alert(errorCode + "\n" + errorMsg);
                return;
            }

            switch (svcID, a, b) {
        	case "search":
        		if (this.ds_list.rowcount < 1) {
        			trace("조회된 결과가 없습니다.");
        		}

        	case "save":
        		trace(svcID, a, b);

        		break;

        	case "update":
        		trace(svcID, a, b);

        		break;
            }
        };

        this.Button02_onclick = function(obj,e)
        {
        	this.ds_list.addRow();
        	var rowP = this.ds_list.rowposition;

        	this.ds_list.setColumn(rowP, "status", 2);
        };

        this.Button02_00_onclick = function(obj,e)
        {
        	var rowP = this.ds_list.rowposition;
        	this.ds_list.setColumn(rowP, "status", 3);
        };


        // 수정 체크 위함
        this.changeCheck = function() {
        	var rowP = this.ds_list.rowposition;

        	var staus = this.ds_list.getColumn(rowP, "status");

        	if(staus == 0) {
        		this.ds_list.setColumn(rowP, "status", 1);
        	}
        }


        // 모든 값이 들어가있는지?
        this.valCheck = function () {
        	var rc = this.ds_list.getRowCount(); // 행 개수
        	for (var r = 0; r < rc; r++) {
        		var title   = this.ds_list.getColumn(r, "title");
        		var content = this.ds_list.getColumn(r, "content");
        		var author  = this.ds_list.getColumn(r, "author");

        		// null/undefined/빈문자 모두 검증
        		if (!title || title === "") return true;
        		if (!content || content === "") return true;
        		if (!author || author === "") return true;
        	}
        	return false; // 문제 없으면 false
        };

        this.Form_Work_onload = function(obj,e)
        {
        	this.fnSearch();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Work_onload,this);
            this.grdList.addEventHandler("oninput",this.grdList_oninput,this);
            this.Button02_00.addEventHandler("onclick",this.Button02_00_onclick,this);
            this.Button02.addEventHandler("onclick",this.Button02_onclick,this);
            this.divSearch.form.btnSave.addEventHandler("onclick",this.btnSave_onclick,this);
            this.divSearch.form.btnSearch.addEventHandler("onclick",this.btnSearch_onclick,this);
            this.Div00.form.edtTitle2.addEventHandler("canchange",this.changeCheck,this);
            this.Div00.form.edtContent2.addEventHandler("canchange",this.changeCheck,this);
            this.ds_search.addEventHandler("cancolumnchange",this.ds_search_cancolumnchange,this);
            this.ds_list.addEventHandler("cancolumnchange",this.ds_list_cancolumnchange,this);
        };
        this.loadIncludeScript("Form_Work.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
