import requests
from xml.etree import ElementTree


# returns JSON form of response from URL
def fetchJSON(url):
    r = requests.get(url)
    if r.status_code is not 200:
        raise ValueError
    return r.json()


# returns an ElementTree representation of
# XML response from URL
def fetchXML(url):
    r = requests.get(url)
    if r.status_code is not 200:
        raise ValueError
    return ElementTree.fromstring(r.content)


def fetchYelpJSON(url):
    r = requests.get(url, headers={
        "Authorization": "Bearer ESPPXZgvpg43NZtUW4KRpOEkt4Jmh_XMGlwyyYd3M1wu7jXWxAhBtXObaJ7VRQXsOivJA_o9WaUFreC7JuCEEEjZhZ9_6iIXeaLK4X2_jgOaoPGCZP1sy7Esws2ZWnYx"})
    if r.status_code is not 200:
        raise ValueError
    return r.json()

def fetchPost(url, data):
    r = requests.post(url, data=data, headers={"Content-Type": "application/json"})
    if r.status_code is not 200:
        raise ValueError
    return r.json()

