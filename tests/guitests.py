# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

#tests various links located on certain pages
"""
#tests navbar on main page
class Main_Nav_Bar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(60)
        driver = self.driver
        driver.get("http://hikingadventures.me/")

    def test_nav_resorts(self):
        driver = self.driver
        resorts_page = driver.find_element_by_link_text("Resorts(current)")
        resorts_page.click()
        self.assertEqual("http://hikingadventures.me/resorts", driver.current_url)


    def test_nav_trails(self):
        driver = self.driver
        trails_page = driver.find_element_by_link_text("Trails")
        trails_page.click()
        self.assertEqual("http://hikingadventures.me/trails", driver.current_url)


    def test_cities_photos(self):
        driver = self.driver
        photos_page = driver.find_element_by_link_text("Photos")
        photos_page.click()
        self.assertEqual("http://hikingadventures.me/photos", driver.current_url)

    def test_restaurants_about(self):
        driver = self.driver
        about_page = driver.find_element_by_link_text("About")
        about_page.click()
        self.assertEqual("http://hikingadventures.me/about", driver.current_url)

    def tearDown(self):
        self.driver.close()


#tests navbar on resort grid
class ResortGridNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_resort_grid_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/resorts")
        driver.find_element_by_link_text("Home").click()
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        driver.back()
        driver.find_element_by_link_text("About").click()
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


#tests navbar on resort instance
class ResortInstanceNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(60)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_resort_instance_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/resorts/497")
        driver.find_element_by_link_text("Home").click()
        driver.back()
        driver.find_element_by_link_text("Resorts(current)").click()
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        driver.back()
        driver.find_element_by_link_text("About").click()
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

#tests nav bar on trail grid
class TrailGridNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(60)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_trail_grid_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/trails")
        driver.find_element_by_link_text("Home").click()
        driver.back()
        driver.find_element_by_link_text("Resorts(current)").click()
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        driver.back()
        driver.find_element_by_link_text("About").click()
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

#tests nav bar on trail instance
class TrailInstanceNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(60)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_trail_instance_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/trails/7000032")
        driver.find_element_by_link_text("Home").click()
        driver.back()
        driver.find_element_by_link_text("Resorts(current)").click()
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        driver.back()
        driver.find_element_by_link_text("About").click()
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

#tests nav bar on photo grid
class PhotoGridNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(60)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_photo_grid_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/photos")
        driver.find_element_by_link_text("Home").click()
        driver.back()
        driver.find_element_by_link_text("Resorts(current)").click()
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        driver.back()
        driver.find_element_by_link_text("About").click()
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


#tests navbar on photo instance
class PhotoInstanceNavBar(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_photo_instance_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/photos/7000032")
        driver.find_element_by_link_text("Home").click()
        driver.back()
        driver.find_element_by_link_text("Resorts(current)").click()
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        driver.back()
        driver.find_element_by_link_text("About").click()
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
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_about_nav_bar(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/about")
        driver.find_element_by_link_text("Home").click()
        driver.back()
        driver.find_element_by_link_text("Resorts(current)").click()
        driver.back()
        driver.find_element_by_link_text("Trails").click()
        driver.back()
        driver.find_element_by_link_text("Photos").click()
        driver.back()
        driver.find_element_by_link_text("About").click()

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
"""
#tests links on resort instances(might be faulty)
class ResortInstanceLinks(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox("./geckodriver")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_resort_instance_links(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/")
        driver.find_element_by_link_text("Resorts(current)").click()
        driver.find_element_by_link_text("Wolf Creek Ski Area").click()
        driver.find_element_by_xpath("//input[@value='Website']").click()
        driver.back()
        driver.find_element_by_link_text("Windy Pass Trail").click()
        driver.back()
        driver.find_element_by_link_text("Treasure Mountain Trail #565").click()
        driver.back()
        driver.find_element_by_link_text("CDT: Blue Lake to Elwood Pass (CO Sec. 2)").click()
        driver.back()
        driver.find_element_by_link_text("CDT: Elwood Pass to Wolf Creek Pass (CO Sec. 3)").click()
        driver.back()
        driver.find_element_by_link_text("CDT: Wolf Creek Pass to South River Peak (CO Sec. 4)").click()
        driver.back()
        driver.find_element_by_link_text("Treasure Falls Trail").click()
        driver.back()
        driver.find_element_by_link_text("Wolf Creek Road #725").click()
        driver.back()
        driver.find_element_by_link_text("Treasure Falls Trail photo").click()

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

"""
#tests links in trail instance
class TrailInstanceLinks(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_trail_instance_links(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/")
        driver.find_element_by_link_text("Trails").click()
        driver.find_element_by_link_text("North Tenmile Creek").click()
        driver.find_element_by_link_text("Frisco Adventure Park").click()
        driver.back()
        driver.find_element_by_id("photo").click()
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



#tests links in photo instance
class PhotoInstanceLinks(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox(executable_path="./geckodriver")
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True

    def test_photo_instance_links(self):
        driver = self.driver
        driver.get("http://hikingadventures.me/")
        driver.find_element_by_link_text("Photos").click()
        driver.find_element_by_link_text("North Tenmile Creek photo").click()
        driver.find_element_by_id("photo").click()
        driver.back()
        driver.find_element_by_link_text("Frisco Adventure Park").click()
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
"""


if __name__ == "__main__":
    unittest.main()
