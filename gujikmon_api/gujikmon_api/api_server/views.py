from .models import Companies,User
from .coSerializer import CoSerializer
from .filterservices import coFiltering
from rest_framework.decorators import api_view
from rest_framework.response import Response

import json
# from django.http import JsonResponse

# 기업 필터링 
@api_view(['POST'])
def companies(request):
    select_param = json.loads(request.body)
    # 필터링 서비스로 필터링된 companies를 받아온다
    companies=coFiltering(select_param)
    serializer = CoSerializer(companies,many=True)
    count=len(companies)
    json_list= make_json_list(companies,serializer)
    json_list.append({'count':count})
    return Response(json_list)


# 기업이름 검색 
# -키워드로 검색
@api_view(['GET'])
def searchCompany(request,keyword):
    coNm=keyword
    companies = Companies.objects.filter(coNm__contains=coNm)
    serializer=CoSerializer(companies,many=True)
    json_list= make_json_list(companies,serializer)
    return Response(json_list)


#관심기업 업데이트
@api_view(['PUT'])
def favorite_Company_Update(request):
    select_param = json.loads(request.body)
    user_pk = select_param['user_pk']
    coId = select_param['favorite']
    user_info = User.objects.get(id = user_pk)
    # 해당 기업 id가 관심기업 목록에 있는지 여부 확인 
    result = next((item for item in user_info.cofavorate if item['coId'] == coId),None)
    # 삭제 
    if result != None :
        user_info.cofavorate.remove({'coId':coId})
        user_info.save()
        company_id = []
        # 관심기업 목록 조회
        for coId in user_info.cofavorate:
            company_id.append(coId['coId'])

        companies = Companies.objects.filter(id__in = company_id)
        serializer=CoSerializer(companies,many=True)
        cofavorites=make_json_list(companies,serializer)
        json_list={
            'result':"remove",
            'cofavorites'  : cofavorites
        }
        return Response(json_list) 
    # 추가
    else:
        user_info.cofavorate.append({'coId':coId})
        user_info.save()
        company_id = []
        # 관심기업 목록 조회
        for coId in user_info.cofavorate:
            company_id.append(coId['coId'])

        companies = Companies.objects.filter(id__in = company_id)
        serializer=CoSerializer(companies,many=True)
        cofavorites=make_json_list(companies,serializer)
        json_list={
            'result':"append",
            'cofavorites'  : cofavorites
        }
        return Response(json_list) 
    


# 관심기업 목록 가져오기
@api_view(['GET'])
def favorite_Companies(request,user_pk):
    user_id = user_pk
    user_info = User.objects.get(id = user_id)
    company_id = []
    # 관심기업 목록 조회
    for coId in user_info.cofavorate:
        company_id.append(coId['coId'])
    #관심 기업 정보 조회
    companies = Companies.objects.filter(id__in = company_id)
    serializer=CoSerializer(companies,many=True)
    json_list= make_json_list(companies,serializer)
    return Response(json_list)


# json_list 만드는 작업
def make_json_list(companies,serializer):
    json_list =[]
    for idx,co in enumerate(companies):
        company={}
        company['company']=serializer.data[idx]
        company['sgBrandNm']=co.sgBrandNm
        company['info']=co.info
        json_list.append(company)
    return json_list