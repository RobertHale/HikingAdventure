# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

#tests various links located on certain pages

#tests navbar on main page

class Main_Nav_Bar(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_nav_resorts(self):
        driver = self.driver
        driver.get("http://hikingadventures.me")
        resorts_page = driver.find_element_by_link_text("Resorts")
        resorts_page.click()
        self.assertEqual("http://hikingadventures.me/resorts", driver.current_url)
        driver.back()

        #tests trails link
        trails_page = driver.find_element_by_link_text("Trails")
        trails_page.click()
        self.assertEqual("http://hikingadventures.me/trails", driver.current_url)
        driver.back()

        #tests photos link
        photos_page = driver.find_element_by_link_text("Photos")
        photos_page.click()
        self.assertEqual("http://hikingadventures.me/photos", driver.current_url)
        driver.back()

        #tests about link
        about_page = driver.find_element_by_link_text("About")
        about_page.click()
        self.assertEqual("http://hikingadventures.me/about", driver.current_url)

    def tearDown(self):
        self.driver.close()


#tests navbar on resort
class ResortNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_resort_grid_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/resorts")
        driver.find_element_by_link_text("Home").click()
        self.assertEqual("http://hikingadventures.me/", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        self.assertEqual("http://hikingadventures.me/trails", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        self.assertEqual("http://hikingadventures.me/photos", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("About").click()
        self.assertEqual("http://hikingadventures.me/about", driver.current_url)
        driver.back()

    def test_resort_instance_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/resorts/497")
        driver.find_element_by_link_text("Home").click()
        self.assertEqual("http://hikingadventures.me/", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Resorts").click()
        self.assertEqual("http://hikingadventures.me/resorts", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        self.assertEqual("http://hikingadventures.me/trails", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        self.assertEqual("http://hikingadventures.me/photos", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("About").click()
        self.assertEqual("http://hikingadventures.me/about", driver.current_url)
        driver.back()


    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)



#tests nav bar on trail
class TrailNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(60)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_trail_grid_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/trails")
        driver.find_element_by_link_text("Home").click()
        self.assertEqual("http://hikingadventures.me/", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Resorts").click()
        self.assertEqual("http://hikingadventures.me/resorts", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        self.assertEqual("http://hikingadventures.me/photos", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("About").click()
        self.assertEqual("http://hikingadventures.me/about", driver.current_url)
        driver.back()

    def test_trail_instance_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/trails/7000032")
        driver.find_element_by_link_text("Home").click()
        self.assertEqual("http://hikingadventures.me/", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Resorts").click()
        self.assertEqual("http://hikingadventures.me/resorts", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        self.assertEqual("http://hikingadventures.me/photos", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        self.assertEqual("http://hikingadventures.me/trails", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("About").click()
        self.assertEqual("http://hikingadventures.me/about", driver.current_url)
        driver.back()

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)


#tests nav bar on photo
class PhotoNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(60)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_photo_grid_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/photos")
        driver.find_element_by_link_text("Home").click()
        self.assertEqual("http://hikingadventures.me/", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Resorts").click()
        self.assertEqual("http://hikingadventures.me/resorts", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        self.assertEqual("http://hikingadventures.me/trails", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("About").click()
        self.assertEqual("http://hikingadventures.me/about", driver.current_url)
        driver.back()
    def test_photo_instance_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/photos/7000032")
        driver.find_element_by_link_text("Home").click()
        self.assertEqual("http://hikingadventures.me/", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Resorts").click()
        self.assertEqual("http://hikingadventures.me/resorts", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        self.assertEqual("http://hikingadventures.me/trails", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        self.assertEqual("http://hikingadventures.me/photos", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("About").click()
        self.assertEqual("http://hikingadventures.me/about", driver.current_url)
        driver.back()

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

#tests nav bar on about page
class AboutNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_about_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/about")
        driver.find_element_by_link_text("Home").click()
        self.assertEqual("http://hikingadventures.me/", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Resorts").click()
        self.assertEqual("http://hikingadventures.me/resorts", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        self.assertEqual("http://hikingadventures.me/trails", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        self.assertEqual("http://hikingadventures.me/photos", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("About").click()
        self.assertEqual("http://hikingadventures.me/about", driver.current_url)

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

#tests links on instances (all done at one time)
class InstanceLinks(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_resort_instance_links(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/")
        driver.find_element_by_link_text("Resorts").click()
        driver.find_element_by_link_text("Wolf Creek Ski Area").click()
        driver.find_element_by_xpath("//input[@value='Website']").click()
        self.assertEqual("https://wolfcreekski.com/", driver.current_url)
        driver.back()

        driver.find_element_by_link_text("Windy Pass Trail").click()
        self.assertEqual("http://hikingadventures.me/trails/7006288", driver.current_url)
        driver.back()

        driver.find_element_by_link_text("Treasure Mountain Trail #565").click()
        self.assertEqual("http://hikingadventures.me/trails/7006294", driver.current_url)
        driver.back()

        driver.find_element_by_link_text("CDT: Blue Lake to Elwood Pass (CO Sec. 2)").click()
        self.assertEqual("http://hikingadventures.me/trails/7016022", driver.current_url)
        driver.back()

        driver.find_element_by_link_text("CDT: Elwood Pass to Wolf Creek Pass (CO Sec. 3)").click()
        self.assertEqual("http://hikingadventures.me/trails/7016023", driver.current_url)
        driver.back()

        driver.find_element_by_link_text("CDT: Wolf Creek Pass to South River Peak (CO Sec. 4)").click()
        self.assertEqual("http://hikingadventures.me/trails/7016024", driver.current_url)
        driver.back()

        driver.find_element_by_link_text("Treasure Falls Trail").click()
        self.assertEqual("http://hikingadventures.me/trails/7032099", driver.current_url)
        driver.back()

        driver.find_element_by_link_text("Wolf Creek Road #725").click()
        self.assertEqual("http://hikingadventures.me/trails/7032838", driver.current_url)
        driver.back()

        driver.find_element_by_link_text("Treasure Falls Trail photo").click()
        self.assertEqual("http://hikingadventures.me/photos/7032099", driver.current_url)

        #test trail links
        trails_page = driver.find_element_by_link_text("Trails")
        trails_page.click()
        driver.find_element_by_link_text("North Tenmile Creek").click()
        driver.find_element_by_link_text("Frisco Adventure Park").click()
        self.assertEqual("http://hikingadventures.me/resorts/4904", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("North Tenmile Creek Photos").click()
        self.assertEqual("http://hikingadventures.me/photos/7000032", driver.current_url)
        driver.back()

        #test photo links
        photos_page = driver.find_element_by_link_text("Photos")
        photos_page.click()
        driver.find_element_by_link_text("North Tenmile Creek photo").click()
        driver.find_element_by_link_text("North Tenmile Creek").click()
        self.assertEqual("http://hikingadventures.me/trails/7000032", driver.current_url)
        driver.back()
        driver.find_element_by_link_text("Frisco Adventure Park").click()
        self.assertEqual("http://hikingadventures.me/resorts/4904", driver.current_url)
        driver.back()

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

#all done at one time
class TestSortBy(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_sort_by(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/resorts")
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        driver.find_element_by_xpath("(//button[@type='button'])[3]").click()
        driver.find_element_by_xpath("(//button[@type='button'])[9]").click()
        driver.find_element_by_xpath("(//button[@type='button'])[11]").click()
        driver.find_element_by_link_text(u"»").click()
        self.assertEqual("http://hikingadventures.me/resortspage=%202", driver.current_url)

        #tests sort for trails
        trails_page = driver.find_element_by_link_text("Trails")
        trails_page.click()
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        time.sleep(5)
        driver.find_element_by_xpath("(//button[@type='button'])[3]").click()
        time.sleep(5)
        driver.find_element_by_xpath("(//button[@type='button'])[9]").click()
        driver.find_element_by_xpath("(//button[@type='button'])[11]").click()
        time.sleep(5)
        driver.find_element_by_link_text("3").click()

        #tests sort for photos_page
        photos_page = driver.find_element_by_link_text("Photos")
        photos_page.click()
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        driver.find_element_by_xpath("(//button[@type='button'])[3]").click()
        time.sleep(5)
        driver.find_element_by_xpath("(//button[@type='button'])[6]").click()
        driver.find_element_by_xpath("(//button[@type='button'])[8]").click()
        time.sleep(5)
        driver.find_element_by_link_text("3").click()

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)


#all done at one time
class TestSearch(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_resorts_search(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/resorts")
        driver.find_element_by_class_name("mr-sm-2").send_keys("b")
        time.sleep(2)
        driver.find_element_by_xpath("//button[@type='submit']").click()
        time.sleep(2)
        self.assertEqual("http://hikingadventures.me/search/b", driver.current_url)

        #tests trail search
        trails_page = driver.find_element_by_link_text("Trails")
        trails_page.click()
        driver.find_element_by_class_name("mr-sm-2").send_keys("n")
        time.sleep(2)
        driver.find_element_by_xpath("//button[@type='submit']").click()
        time.sleep(2)
        self.assertEqual("http://hikingadventures.me/search/n", driver.current_url)

        #tests photo search
        photos_page = driver.find_element_by_link_text("Photos")
        photos_page.click()
        driver.find_element_by_class_name("mr-sm-2").send_keys("s")
        time.sleep(2)
        driver.find_element_by_xpath("//button[@type='submit']").click()
        time.sleep(2)
        self.assertEqual("http://hikingadventures.me/search/s", driver.current_url)

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)


#all done at one time
class testFilter(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_filter(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/resorts")
        driver.find_element_by_xpath("(//button[@type='button'])[12]").click()
        driver.find_element_by_xpath("(//input[@value=''])[2]").click()
        driver.find_element_by_class_name("form-control").send_keys("16")
        time.sleep(2)
        driver.find_element_by_xpath("(//button[@type='button'])[14]").click()
        time.sleep(2)

        #test trail filter
        trails_page = driver.find_element_by_link_text("Trails")
        trails_page.click()
        driver.find_element_by_xpath("(//button[@type='button'])[12]").click()
        driver.find_element_by_xpath("(//input[@value=''])[2]").click()
        driver.find_element_by_class_name("form-control").send_keys("16")
        time.sleep(2)
        driver.find_element_by_xpath("(//button[@type='button'])[14]").click()
        time.sleep(2)

        #test photo filter
        photos_page = driver.find_element_by_link_text("Photos")
        photos_page.click()
        driver.find_element_by_xpath("(//button[@type='button'])[9]").click()
        driver.find_element_by_xpath("(//input[@value=''])[2]").click()
        driver.find_element_by_class_name("form-control").send_keys("39.5759")
        time.sleep(2)
        driver.find_element_by_xpath("(//button[@type='button'])[12]").click()

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

class Reset(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver.exe")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_reset(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/resorts")
        time.sleep(2)
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        driver.find_element_by_xpath("(//button[@type='button'])[3]").click()
        time.sleep(2)
        driver.find_element_by_xpath("(//button[@type='button'])[13]").click()
        driver.find_element_by_link_text("Trails").click()
        time.sleep(2)
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        driver.find_element_by_xpath("(//button[@type='button'])[3]").click()
        time.sleep(2)
        driver.find_element_by_xpath("(//button[@type='button'])[13]").click()
        driver.find_element_by_link_text("Photos").click()
        time.sleep(2)
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        driver.find_element_by_xpath("(//button[@type='button'])[3]").click()
        time.sleep(2)
        driver.find_element_by_xpath("(//button[@type='button'])[10]").click()

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)
if __name__ == "__main__":
    unittest.main()
