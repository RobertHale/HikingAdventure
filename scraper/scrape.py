# import requests
# from xml.etree import ElementTree

# class res:
#     def __init__(self, name, id):
#         self.name    = name
#         self.id      = id
#         self.lifts   = ""
#         self.runs    = ""
#         self.website = ""
#         self.lat     = ""
#         self.long    = ""
#         self.elev    = ""
#         self.mapid   = ""


# def main():
#     r= requests.get("https://skimap.org/Regions/view/281.xml")
#     assert(r.status_code is 200)
#     tree = ElementTree.fromstring(r.content)
#     resorts = tree.find('skiAreas')
#     for child in resorts:
#         resort = requests.get("https://skimap.org/SkiAreas/view/" + child.attrib['id'] + ".json")
#         assert(resort.status_code is 200)
#         data = resort.json()
#         resy = res(data['name'], data['id'])
#         resy.lifts   = data['lift_count']        if 'lift_count'       in data else -1
#         resy.runs    = data['run_count']         if 'run_count'        in data else -1
#         resy.website = data['official_website']  if 'official_website' in data else "unknown"
#         resy.lat     = data['latitude']          if 'latitude'         in data else -1
#         resy.long    = data['longitude']         if 'longitude'        in data else -1
#         resy.elev    = data['top_elevation']     if 'top_elevation'    in data else -1
#         resy.mapid   = data['ski_maps'][0]['id'] if len(data['ski_maps']) > 0  else -1
#         print(resy.name, resy.id, resy.mapid)
#         print("\t", resy.website)
#         print("\t", resy.lat, resy.long)
#         print("\t", resy.lifts, resy.runs, resy.elev)
from service import getResorts

def main():
    print(getResorts())

if __name__ == "__main__":
    main()